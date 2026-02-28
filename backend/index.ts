import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set in .env");

const bot = new Telegraf(BOT_TOKEN);
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ─── Types ────────────────────────────────────────────────────────────────────

interface Ingredient {
  name: string;
  reason: string;
}

interface Analysis {
  is_product: boolean;
  rejection_reason: string | null;
  product_name: string | null;
  brand: string | null;
  health_score: number;
  ingredients: {
    good: Ingredient[];
    okay: Ingredient[];
    bad: Ingredient[];
  };
}

interface TokenUsage {
  prompt: number;
  candidates: number;
  thoughts: number;
  total: number;
  search_requests: number;
  cost_usd: number;
}

interface ScanRecord {
  timestamp: string;
  analysis: Analysis;
  tokens: TokenUsage;
}

interface UserScan {
  username: string | null;
  scans: ScanRecord[];
}

interface OnboardingAnswers {
  q1?: string;
  q2?: string;
  q3?: string;
  q4?: string;
  q5?: string;
}

interface HealthProfile {
  dietary_preferences: string[];
  food_allergies: string[];
  ingredient_sensitivities: string[];
  skin_allergies: string[];
  health_conditions: string[];
}

interface UserData extends HealthProfile {
  id: string;
  username: string | null;
  first_name: string;
  last_name: string | null;
  joined_at: string;
  total_scans: number;
  total_cost_usd: number;
  // Onboarding
  is_onboarded: boolean;
  onboarding_step: number; // 0=not started, 1–5=waiting for qN, 6=done
  onboarding_raw_answers: OnboardingAnswers;
}

type ResponsesDB = Record<string, UserScan>;
type UsersDB = Record<string, UserData>;

// ─── Storage ──────────────────────────────────────────────────────────────────

const RESPONSES_PATH = new URL("./responses.json", import.meta.url).pathname;
const USERS_PATH = new URL("./users.json", import.meta.url).pathname;

async function loadJSON<T>(path: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await Bun.file(path).text());
  } catch {
    return fallback;
  }
}

async function saveJSON(path: string, data: unknown) {
  await Bun.write(path, JSON.stringify(data, null, 2));
}

function newUser(from: {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
}): UserData {
  return {
    id: String(from.id),
    username: from.username ?? null,
    first_name: from.first_name,
    last_name: from.last_name ?? null,
    joined_at: new Date().toISOString(),
    total_scans: 0,
    total_cost_usd: 0,
    is_onboarded: false,
    onboarding_step: 0,
    onboarding_raw_answers: {},
    dietary_preferences: [],
    food_allergies: [],
    ingredient_sensitivities: [],
    skin_allergies: [],
    health_conditions: [],
  };
}

async function getUser(id: string): Promise<UserData | null> {
  const db = await loadJSON<UsersDB>(USERS_PATH, {});
  return db[id] ?? null;
}

async function updateUser(user: UserData) {
  const db = await loadJSON<UsersDB>(USERS_PATH, {});
  db[user.id] = user;
  await saveJSON(USERS_PATH, db);
}

async function saveScan(
  from: { id: number; username?: string },
  scan: ScanRecord
) {
  const id = String(from.id);

  const responses = await loadJSON<ResponsesDB>(RESPONSES_PATH, {});
  if (!responses[id]) responses[id] = { username: from.username ?? null, scans: [] };
  responses[id].username = from.username ?? null;
  responses[id].scans.push(scan);
  await saveJSON(RESPONSES_PATH, responses);

  const db = await loadJSON<UsersDB>(USERS_PATH, {});
  if (db[id]) {
    db[id].total_scans += 1;
    db[id].total_cost_usd = Number(
      (db[id].total_cost_usd + scan.tokens.cost_usd).toFixed(6)
    );
    await saveJSON(USERS_PATH, db);
  }
}

// ─── Onboarding ───────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    step: 1,
    prompt: `🥗 *Question 1 of 5 — Diet*\n\nDo you follow any specific diet?\n_Examples: vegetarian, vegan, keto, halal, kosher, low sugar_\n\nOr type *none*.`,
  },
  {
    step: 2,
    prompt: `🚨 *Question 2 of 5 — Food Allergies*\n\nDo you have any food allergies?\n_Examples: peanuts, dairy, gluten, shellfish, soy, tree nuts_\n\nOr *none*.`,
  },
  {
    step: 3,
    prompt: `⚠️ *Question 3 of 5 — Ingredient Sensitivities*\n\nAny ingredients you try to avoid or react to?\n_Examples: MSG, artificial sweeteners, caffeine, food dyes, preservatives_\n\nOr *none*.`,
  },
  {
    step: 4,
    prompt: `🧴 *Question 4 of 5 — Skin Sensitivities*\n\nDo you have sensitive skin or react to cosmetic ingredients?\n_Examples: fragrance, parabens, sulfates, alcohol, silicones_\n\nOr *none*.`,
  },
  {
    step: 5,
    prompt: `🏥 *Question 5 of 5 — Health Conditions*\n\nAny health conditions that affect what you eat or use?\n_Examples: lactose intolerance, diabetes, IBS, celiac disease_\n\nOr *none*.`,
  },
];

const profileExtractionSchema = {
  type: "object",
  properties: {
    dietary_preferences:      { type: "array", items: { type: "string" } },
    food_allergies:           { type: "array", items: { type: "string" } },
    ingredient_sensitivities: { type: "array", items: { type: "string" } },
    skin_allergies:           { type: "array", items: { type: "string" } },
    health_conditions:        { type: "array", items: { type: "string" } },
  },
  required: [
    "dietary_preferences",
    "food_allergies",
    "ingredient_sensitivities",
    "skin_allergies",
    "health_conditions",
  ],
};

async function extractHealthProfile(answers: OnboardingAnswers): Promise<HealthProfile> {
  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Extract a structured health profile from these user answers.
Rules:
- Normalize spelling mistakes and lowercase everything
- Remove duplicates
- If an answer means "no", "none", "nothing", "n/a", or is unclear — return []
- Correctly categorize cross-category info (e.g. "lactose intolerant" goes to health_conditions, not food_allergies)

Q1 (Diet): ${answers.q1 ?? ""}
Q2 (Food allergies): ${answers.q2 ?? ""}
Q3 (Ingredient sensitivities): ${answers.q3 ?? ""}
Q4 (Skin sensitivities): ${answers.q4 ?? ""}
Q5 (Health conditions): ${answers.q5 ?? ""}`,
          },
        ],
      },
    ],
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: profileExtractionSchema,
    },
  });

  const text = result.text ?? "";
  if (!text) throw new Error("Empty response during profile extraction");
  return JSON.parse(text.trim());
}

function formatProfile(user: UserData): string {
  const section = (emoji: string, label: string, items: string[]) =>
    items.length > 0
      ? `${emoji} *${label}*\n${items.map((i) => `• ${i}`).join("\n")}\n\n`
      : "";

  let msg = `✅ *Your health profile is ready, ${user.first_name}!*\n\n`;
  msg += section("🥗", "Diet", user.dietary_preferences);
  msg += section("🚨", "Food Allergies", user.food_allergies);
  msg += section("⚠️", "Ingredient Sensitivities", user.ingredient_sensitivities);
  msg += section("🧴", "Skin Sensitivities", user.skin_allergies);
  msg += section("🏥", "Health Conditions", user.health_conditions);

  const empty =
    user.dietary_preferences.length === 0 &&
    user.food_allergies.length === 0 &&
    user.ingredient_sensitivities.length === 0 &&
    user.skin_allergies.length === 0 &&
    user.health_conditions.length === 0;

  if (empty) msg += "_No specific restrictions noted._\n\n";

  msg += "📸 You can now send product photos to get personalized analysis!";
  return msg.trim();
}

async function advanceOnboarding(
  ctx: any,
  user: UserData,
  answer: string
) {
  // Save answer for the current step
  const qKey = `q${user.onboarding_step}` as keyof OnboardingAnswers;
  user.onboarding_raw_answers[qKey] = answer;

  if (user.onboarding_step < 5) {
    user.onboarding_step += 1;
    await updateUser(user);
    const next = QUESTIONS[user.onboarding_step - 1];
    await ctx.reply(next.prompt, { parse_mode: "Markdown" });
  } else {
    // Q5 answered — extract profile
    const processing = await ctx.reply("Analyzing your health profile... ⏳");
    try {
      const profile = await extractHealthProfile(user.onboarding_raw_answers);
      Object.assign(user, profile);
      user.is_onboarded = true;
      user.onboarding_step = 6;
      await updateUser(user);
      await ctx.telegram.deleteMessage(ctx.chat.id, processing.message_id);
      await ctx.reply(formatProfile(user), { parse_mode: "Markdown" });
    } catch (err) {
      console.error("Profile extraction failed:", err);
      await ctx.telegram.deleteMessage(ctx.chat.id, processing.message_id).catch(() => {});
      user.is_onboarded = true;
      user.onboarding_step = 6;
      await updateUser(user);
      await ctx.reply(
        "Profile saved! You can now send product photos to analyze them. 📸"
      );
    }
  }
}

// ─── Image Processing ─────────────────────────────────────────────────────────

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 896, withoutEnlargement: true })
    .jpeg({ quality: 78 })
    .toBuffer();
}

// ─── Gemini Product Analysis ──────────────────────────────────────────────────

const MODEL = "gemini-3-flash-preview";
const PRICE = { input: 0.5, output: 3.0, search: 35.0 };

function calcCost(prompt: number, output: number, searches: number): number {
  return (
    (prompt / 1_000_000) * PRICE.input +
    (output / 1_000_000) * PRICE.output +
    (searches / 1000) * PRICE.search
  );
}

const responseSchema = {
  type: "object",
  properties: {
    is_product:       { type: "boolean" },
    rejection_reason: { type: ["string", "null"] },
    product_name:     { type: ["string", "null"] },
    brand:            { type: ["string", "null"] },
    health_score:     { type: "integer", minimum: 0, maximum: 100 },
    ingredients: {
      type: "object",
      properties: {
        good: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" }, reason: { type: "string" } },
            required: ["name", "reason"],
          },
        },
        okay: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" }, reason: { type: "string" } },
            required: ["name", "reason"],
          },
        },
        bad: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" }, reason: { type: "string" } },
            required: ["name", "reason"],
          },
        },
      },
      required: ["good", "okay", "bad"],
    },
  },
  required: ["is_product", "product_name", "brand", "health_score", "ingredients"],
};

async function analyzeProductImage(
  imageBase64: string,
  profile: HealthProfile
): Promise<{ analysis: Analysis; tokens: TokenUsage }> {
  const hasProfile = Object.values(profile).some((arr) => arr.length > 0);

  const profileSection = hasProfile
    ? `\nUser health profile — flag conflicts clearly in ingredient reasons:
• Diet: ${profile.dietary_preferences.join(", ") || "none"}
• Food allergies: ${profile.food_allergies.join(", ") || "none"}
• Ingredient sensitivities: ${profile.ingredient_sensitivities.join(", ") || "none"}
• Skin sensitivities: ${profile.skin_allergies.join(", ") || "none"}
• Health conditions: ${profile.health_conditions.join(", ") || "none"}\n`
    : "";

  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze this image.
1. Extract product_name and brand from the label.
2. Give a health_score from 0–100.
3. Categorize ALL visible ingredients as good / okay / bad with a brief reason.
${profileSection}`,
          },
          { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
        ],
      },
    ],
    config: {
      temperature: 0.5,
      maxOutputTokens: 4096,
      systemInstruction: `Today is ${new Date().toDateString()}. You are an expert health and wellness analyst. Only analyze packaged food or cosmetic/personal care products — if the image is not one, set is_product: false. Use googleSearch to verify current ingredient safety data.`,
      responseMimeType: "application/json",
      responseSchema,
      tools: [{ googleSearch: {} }],
    },
  });

  const text =
    result.text ||
    (result as any).candidates?.[0]?.content?.parts?.[0]?.text ||
    "";
  if (!text) throw new Error("Empty response from Gemini");

  const usage = (result as any).usageMetadata ?? {};
  const promptT = usage.promptTokenCount ?? 0;
  const candidatesT = usage.candidatesTokenCount ?? 0;
  const thoughtsT = usage.thoughtsTokenCount ?? 0;
  const total = usage.totalTokenCount ?? promptT + candidatesT + thoughtsT;

  const groundingMeta = (result as any).candidates?.[0]?.groundingMetadata;
  const searches = (groundingMeta?.webSearchQueries?.length ?? 0) > 0 ? 1 : 0;
  if (searches) console.log(`[Grounding]`, groundingMeta?.webSearchQueries);

  const tokens: TokenUsage = {
    prompt: promptT,
    candidates: candidatesT,
    thoughts: thoughtsT,
    total,
    search_requests: searches,
    cost_usd: Number(calcCost(promptT, candidatesT + thoughtsT, searches).toFixed(6)),
  };

  return { analysis: JSON.parse(text.trim()), tokens };
}

// ─── Formatter ────────────────────────────────────────────────────────────────

function formatAnalysis(analysis: Analysis): string {
  const { product_name, brand, health_score, ingredients } = analysis;
  const emoji = health_score >= 70 ? "🟢" : health_score >= 40 ? "🟡" : "🔴";

  let msg = "";
  if (product_name) msg += `*${product_name}*`;
  if (brand) msg += ` by _${brand}_`;
  if (msg) msg += "\n\n";
  msg += `${emoji} *Health Score: ${health_score}/100*\n\n`;

  if (ingredients.good.length > 0) {
    msg += `✅ *Good Ingredients*\n`;
    for (const i of ingredients.good) msg += `• *${i.name}* — ${i.reason}\n`;
    msg += "\n";
  }
  if (ingredients.okay.length > 0) {
    msg += `⚪ *Okay Ingredients*\n`;
    for (const i of ingredients.okay) msg += `• *${i.name}* — ${i.reason}\n`;
    msg += "\n";
  }
  if (ingredients.bad.length > 0) {
    msg += `❌ *Bad Ingredients*\n`;
    for (const i of ingredients.bad) msg += `• *${i.name}* — ${i.reason}\n`;
  }

  return msg.trim();
}

// ─── Commands ─────────────────────────────────────────────────────────────────

bot.command("profile", async (ctx) => {
  const user = await getUser(String(ctx.from.id));
  if (!user?.is_onboarded) {
    await ctx.reply("You haven't completed your health profile yet.");
    return;
  }
  await ctx.reply(formatProfile(user), { parse_mode: "Markdown" });
});

bot.command("resetprofile", async (ctx) => {
  const user = await getUser(String(ctx.from.id));
  if (!user) return;

  user.is_onboarded = false;
  user.onboarding_step = 1;
  user.onboarding_raw_answers = {};
  user.dietary_preferences = [];
  user.food_allergies = [];
  user.ingredient_sensitivities = [];
  user.skin_allergies = [];
  user.health_conditions = [];
  await updateUser(user);

  await ctx.reply(
    "Profile reset! Let's start fresh.\n\n" + QUESTIONS[0].prompt,
    { parse_mode: "Markdown" }
  );
});

// ─── Message Handlers ─────────────────────────────────────────────────────────

bot.on(message("text"), async (ctx) => {
  const id = String(ctx.from.id);
  let user = await getUser(id);

  if (!user) {
    user = newUser(ctx.from);
    user.onboarding_step = 1;
    await updateUser(user);
    await ctx.reply(
      `👋 Welcome, ${ctx.from.first_name}!\n\nBefore scanning products, I need to build your *personal health profile* so I can flag ingredients that affect _you specifically_.\n\nJust *5 quick questions* — let's go!`,
      { parse_mode: "Markdown" }
    );
    await ctx.reply(QUESTIONS[0].prompt, { parse_mode: "Markdown" });
    return;
  }

  // Keep basic info fresh
  user.username = ctx.from.username ?? null;
  user.first_name = ctx.from.first_name;
  user.last_name = ctx.from.last_name ?? null;

  if (!user.is_onboarded) {
    if (user.onboarding_step === 0) {
      user.onboarding_step = 1;
      await updateUser(user);
      await ctx.reply(QUESTIONS[0].prompt, { parse_mode: "Markdown" });
      return;
    }
    await advanceOnboarding(ctx, user, ctx.message.text.trim());
    return;
  }

  await updateUser(user);
  await ctx.reply(
    "Send me a photo of a packaged food or cosmetic product and I'll analyze its health score and ingredients for you! 📸"
  );
});

bot.on(message("photo"), async (ctx) => {
  const id = String(ctx.from.id);
  let user = await getUser(id);

  // New user — start onboarding
  if (!user) {
    user = newUser(ctx.from);
    user.onboarding_step = 1;
    await updateUser(user);
    await ctx.reply(
      `👋 Welcome, ${ctx.from.first_name}!\n\nBefore scanning products, I need to build your *personal health profile* — just *5 quick questions*!`,
      { parse_mode: "Markdown" }
    );
    await ctx.reply(QUESTIONS[0].prompt, { parse_mode: "Markdown" });
    return;
  }

  // Onboarding not done
  if (!user.is_onboarded) {
    await ctx.reply(
      "Please finish your health profile first! Answer the question below:"
    );
    const q = QUESTIONS[(user.onboarding_step || 1) - 1];
    if (q) await ctx.reply(q.prompt, { parse_mode: "Markdown" });
    return;
  }

  const thinking = await ctx.reply("Analyzing your product... 🔍");
  try {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];
    if (!photo) throw new Error("No photo found");

    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const res = await fetch(fileLink.href);
    const original = Buffer.from(await res.arrayBuffer());

    const compressed = await compressImage(original);
    const { width, height } = await sharp(compressed).metadata();
    console.log(`[Image] ${width}x${height}, ${compressed.length}B`);

    const profile: HealthProfile = {
      dietary_preferences:      user.dietary_preferences,
      food_allergies:           user.food_allergies,
      ingredient_sensitivities: user.ingredient_sensitivities,
      skin_allergies:           user.skin_allergies,
      health_conditions:        user.health_conditions,
    };

    const { analysis, tokens } = await analyzeProductImage(
      compressed.toString("base64"),
      profile
    );

    await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id);

    if (!analysis.is_product) {
      await ctx.reply(
        `That doesn't look like a packaged product. ${analysis.rejection_reason || "Please send a photo of a food or cosmetic product."}`
      );
      return;
    }

    await saveScan(ctx.from, {
      timestamp: new Date().toISOString(),
      analysis,
      tokens,
    });

    console.log(
      `[Scan] @${ctx.from.username ?? id} — ${analysis.product_name ?? "?"} by ${analysis.brand ?? "?"} — tokens: ${tokens.total}, search: ${tokens.search_requests ? "yes" : "no"}, cost: $${tokens.cost_usd}`
    );

    await ctx.reply(formatAnalysis(analysis), { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Analysis error:", error);
    await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id).catch(() => {});
    await ctx.reply("Sorry, I couldn't analyze that image. Please try again.");
  }
});

// ─── Launch ───────────────────────────────────────────────────────────────────

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
