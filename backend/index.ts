import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { GoogleGenAI } from "@google/genai";
import sharp from "sharp";
import Fuse from "fuse.js";

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

type CompatibilityLevel = "VERY HIGH" | "HIGH" | "MEDIUM" | "LOW" | "NONE";

interface Compatibility {
  compatibility_level: CompatibilityLevel;
  reason: string;
}

interface TokenUsage {
  prompt: number;
  candidates: number;
  thoughts: number;
  total: number;
  search_requests: number;
  cost_usd: number;
}

interface Product {
  id: string;
  product_name: string | null;
  brand: string | null;
  health_score?: number | null;
  ingredients?: {
    good: Ingredient[];
    okay: Ingredient[];
    bad: Ingredient[];
  } | null;
  created_at: string;
  source?: string;
}

interface ProductExtraction {
  is_product: boolean;
  rejection_reason: string | null;
  product_name: string | null;
  brand: string | null;
}

interface ScanRecord {
  timestamp: string;
  product_id: string | null;
  cache_hit: boolean;
  compatibility: Compatibility | null;
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
const USERS_PATH     = new URL("./users.json",     import.meta.url).pathname;
const PRODUCTS_PATH  = new URL("./products.json",  import.meta.url).pathname;

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

// ─── Product Store ────────────────────────────────────────────────────────────

const FILLER_WORDS = [
  "soft drink", "beverage", "packaged", "product", "snack",
  "food", "drink", "bar", "mix", "brand",
];

function normalizeProductKey(brand: string | null, name: string | null): string {
  let raw = `${brand ?? ""} ${name ?? ""}`.toLowerCase().replace(/[^\w\s]/g, " ");
  for (const word of FILLER_WORDS) {
    raw = raw.replace(new RegExp(`\\b${word}\\b`, "gi"), " ");
  }
  return raw.replace(/\s+/g, " ").trim();
}

async function fuzzyFindProduct(
  brand: string | null,
  name: string | null
): Promise<Product | null> {
  const targetKey = normalizeProductKey(brand, name);
  if (!targetKey) return null;

  const db = await loadJSON<Record<string, Product>>(PRODUCTS_PATH, {});
  const products = Object.values(db).filter(Boolean) as Product[];
  if (products.length === 0) return null;

  const entries = products.map((p) => ({
    product: p,
    key: normalizeProductKey(p.brand, p.product_name),
  }));

  const fuse = new Fuse(entries, { keys: ["key"], threshold: 0.15, includeScore: true });
  const results = fuse.search(targetKey);
  if (results.length === 0) return null;

  const best = results[0]!;
  console.log(`[Fuzzy] "${targetKey}" → "${best.item.key}" (score: ${best.score?.toFixed(3)})`);
  return best.item.product;
}

function combineTokens(a: TokenUsage, b: TokenUsage): TokenUsage {
  return {
    prompt:          a.prompt          + b.prompt,
    candidates:      a.candidates      + b.candidates,
    thoughts:        a.thoughts        + b.thoughts,
    total:           a.total           + b.total,
    search_requests: a.search_requests + b.search_requests,
    cost_usd: Number((a.cost_usd + b.cost_usd).toFixed(6)),
  };
}

async function saveProduct(product: Product) {
  const db = await loadJSON<Record<string, Product>>(PRODUCTS_PATH, {});
  db[product.id] = product;
  await saveJSON(PRODUCTS_PATH, db);
}

async function findProductByNameBrand(
  product_name: string | null,
  brand: string | null
): Promise<Product | null> {
  const db = await loadJSON<Record<string, Product>>(PRODUCTS_PATH, {});
  if (!product_name && !brand) return null;
  const norm = (s: string | null) => (s ?? "").trim().toLowerCase();
  const targetName = norm(product_name);
  const targetBrand = norm(brand);
  for (const key of Object.keys(db)) {
    const p = db[key];
    if (!p) continue;
    if (norm(p.product_name) === targetName && norm(p.brand) === targetBrand) return p;
  }
  return null;
}

async function createOrGetProductFromAnalysis(analysis: Analysis): Promise<Product | null> {
  if (!analysis.is_product) return null;
  const existing = await findProductByNameBrand(analysis.product_name, analysis.brand);
  if (existing) return existing;
  const id = crypto.randomUUID();
  const product: Product = {
    id,
    product_name: analysis.product_name,
    brand: analysis.brand,
    health_score: analysis.health_score ?? null,
    ingredients: analysis.ingredients ?? null,
    created_at: new Date().toISOString(),
    source: "gemini-analysis",
  };
  await saveProduct(product);
  return product;
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
  const contents = [
    {
      role: "user" as const,
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
  ];

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
    config: {
      temperature: 0.1,
      responseMimeType: "application/json",
      responseSchema: profileExtractionSchema,
    },
  });

  const text = extractOutputText(result);
  if (!text) throw new Error("Empty response during profile extraction");
  console.log(`[extractHealthProfile] Response length: ${text.length} chars`);

  try {
    return parseModelJSON<HealthProfile>(text);
  } catch (err) {
    console.log(`[Retry] extractHealthProfile — ${(err as Error).message}`);
    const retryResult = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        temperature: 0,
        responseMimeType: "application/json",
        responseSchema: profileExtractionSchema,
        systemInstruction: "Return ONLY valid JSON. Do not truncate. Do not include explanations.",
      },
    });
    const retryText = extractOutputText(retryResult);
    if (!retryText) throw new Error("Empty response during profile extraction retry");
    console.log(`[Retry] extractHealthProfile response length: ${retryText.length} chars`);
    return parseModelJSON<HealthProfile>(retryText);
  }
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
    await ctx.reply(QUESTIONS[user.onboarding_step - 1]!.prompt, { parse_mode: "Markdown" });
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

/** Extract only non-thought output parts so thinking-model reasoning doesn't corrupt JSON parsing. */
function extractOutputText(result: any): string {
  const parts: any[] = result?.candidates?.[0]?.content?.parts ?? [];
  const outputText = parts
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text as string)
    .join("");
  return outputText || result.text || "";
}

/**
 * Parse JSON from a model response that may contain surrounding prose.
 * Tries direct parse first; falls back to extracting the first {...} block.
 */
function parseModelJSON<T>(text: string): T {
  const trimmed = text.trim();

  // Guard: a valid JSON object must end with '}'
  if (!trimmed.endsWith("}")) {
    console.error(`[parseModelJSON] Truncated response (${trimmed.length} chars) — doesn't end with '}'`);
    throw new Error("Truncated JSON from model");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        if (!match[0].endsWith("}")) {
          throw new Error("Truncated JSON from model");
        }
      }
    }
    console.error(`[parseModelJSON] Failed to parse model response (${trimmed.length} chars)`);
    throw new SyntaxError(`Invalid JSON in model response: ${trimmed.slice(0, 120)}`);
  }
}

const MODEL = "gemini-3-flash-preview";
const PRICE = { input: 0.5, output: 3.0, search: 35.0 };

function calcCost(prompt: number, output: number, searches: number): number {
  return (
    (prompt / 1_000_000) * PRICE.input +
    (output / 1_000_000) * PRICE.output +
    (searches / 1000) * PRICE.search
  );
}

const extractionSchema = {
  type: "object",
  properties: {
    is_product:       { type: "boolean" },
    rejection_reason: { type: ["string", "null"] },
    product_name:     { type: ["string", "null"] },
    brand:            { type: ["string", "null"] },
  },
  required: ["is_product", "rejection_reason", "product_name", "brand"],
};

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

const compatibilitySchema = {
  type: "object",
  properties: {
    compatibility_level: {
      type: "string",
      enum: ["VERY HIGH", "HIGH", "MEDIUM", "LOW", "NONE"],
    },
    reason: { type: "string" },
  },
  required: ["compatibility_level", "reason"],
};

async function extractBasicProductInfo(
  imageBase64: string
): Promise<{ extraction: ProductExtraction; tokens: TokenUsage }> {
  const contents = [
    {
      role: "user" as const,
      parts: [
        {
          text: `Look at this image. Extract:
1. Is this a packaged food or cosmetic/personal care product? (is_product)
2. The exact product_name as printed on the label.
3. The exact brand name.

If not a packaged product, set is_product to false and explain in rejection_reason.`,
        },
        { inlineData: { mimeType: "image/jpeg" as const, data: imageBase64 } },
      ],
    },
  ];

  const result = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      temperature: 0.1,
      maxOutputTokens: 1024,
      systemInstruction: `You are a product label reader. Extract only what is explicitly visible on the label. Do not infer or guess. Reply with JSON only — no explanatory text.`,
      responseMimeType: "application/json",
      responseSchema: extractionSchema,
    },
  });

  const text = extractOutputText(result);
  if (!text) throw new Error("Empty response from Gemini (extraction)");
  console.log(`[extractBasicProductInfo] Response length: ${text.length} chars`);

  const usage = (result as any).usageMetadata ?? {};
  let promptT = usage.promptTokenCount ?? 0;
  let candidatesT = usage.candidatesTokenCount ?? 0;
  let thoughtsT = usage.thoughtsTokenCount ?? 0;
  let total = usage.totalTokenCount ?? promptT + candidatesT + thoughtsT;

  let extraction: ProductExtraction;
  try {
    extraction = parseModelJSON<ProductExtraction>(text);
  } catch (err) {
    console.log(`[Retry] extractBasicProductInfo — ${(err as Error).message}`);
    const retryResult = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        temperature: 0,
        maxOutputTokens: 1024,
        systemInstruction: "Return ONLY valid JSON. Do not truncate. Do not include explanations.",
        responseMimeType: "application/json",
        responseSchema: extractionSchema,
      },
    });
    const retryText = extractOutputText(retryResult);
    if (!retryText) throw new Error("Empty response from Gemini (extraction retry)");
    console.log(`[Retry] extractBasicProductInfo response length: ${retryText.length} chars`);
    const ru = (retryResult as any).usageMetadata ?? {};
    promptT    += ru.promptTokenCount ?? 0;
    candidatesT += ru.candidatesTokenCount ?? 0;
    thoughtsT  += ru.thoughtsTokenCount ?? 0;
    total      += ru.totalTokenCount ?? 0;
    extraction = parseModelJSON<ProductExtraction>(retryText);
  }

  const tokens: TokenUsage = {
    prompt: promptT,
    candidates: candidatesT,
    thoughts: thoughtsT,
    total,
    search_requests: 0,
    cost_usd: Number(calcCost(promptT, candidatesT + thoughtsT, 0).toFixed(6)),
  };

  return { extraction, tokens };
}

async function analyzeProductDeep(
  imageBase64: string
): Promise<{ analysis: Analysis; tokens: TokenUsage }> {
  const contents = [
    {
      role: "user" as const,
      parts: [
        {
          text: `Analyze this image.
1. Extract product_name and brand from the label.
2. Give a health_score from 0–100 based on general ingredient quality.
3. Categorize ALL visible ingredients as good / okay / bad with a brief reason.`,
        },
        { inlineData: { mimeType: "image/jpeg" as const, data: imageBase64 } },
      ],
    },
  ];

  const result = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      temperature: 0.5,
      maxOutputTokens: 4096,
      systemInstruction: `Today is ${new Date().toDateString()}. You are an expert health and wellness analyst. Only analyze packaged food or cosmetic/personal care products — if the image is not one, set is_product: false. Use googleSearch to verify current ingredient safety data.`,
      responseMimeType: "application/json",
      responseSchema,
      tools: [{ googleSearch: {} }],
    },
  });

  const text = extractOutputText(result);
  if (!text) throw new Error("Empty response from Gemini");
  console.log(`[analyzeProductDeep] Response length: ${text.length} chars`);

  const usage = (result as any).usageMetadata ?? {};
  let promptT    = usage.promptTokenCount ?? 0;
  let candidatesT = usage.candidatesTokenCount ?? 0;
  let thoughtsT  = usage.thoughtsTokenCount ?? 0;
  let total      = usage.totalTokenCount ?? promptT + candidatesT + thoughtsT;

  const groundingMeta = (result as any).candidates?.[0]?.groundingMetadata;
  let searches = (groundingMeta?.webSearchQueries?.length ?? 0) > 0 ? 1 : 0;
  if (searches) console.log(`[Grounding]`, groundingMeta?.webSearchQueries);

  let analysis: Analysis;
  try {
    analysis = parseModelJSON<Analysis>(text);
  } catch (err) {
    console.log(`[Retry] analyzeProductDeep — ${(err as Error).message}`);
    const retryResult = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        temperature: 0,
        maxOutputTokens: 4096,
        systemInstruction: "Return ONLY valid JSON. Do not truncate. Do not include explanations.",
        responseMimeType: "application/json",
        responseSchema,
        tools: [{ googleSearch: {} }],
      },
    });
    const retryText = extractOutputText(retryResult);
    if (!retryText) throw new Error("Empty response from Gemini (analyzeProductDeep retry)");
    console.log(`[Retry] analyzeProductDeep response length: ${retryText.length} chars`);
    const ru = (retryResult as any).usageMetadata ?? {};
    promptT    += ru.promptTokenCount ?? 0;
    candidatesT += ru.candidatesTokenCount ?? 0;
    thoughtsT  += ru.thoughtsTokenCount ?? 0;
    total      += ru.totalTokenCount ?? 0;
    const rg = (retryResult as any).candidates?.[0]?.groundingMetadata;
    if ((rg?.webSearchQueries?.length ?? 0) > 0) searches += 1;
    analysis = parseModelJSON<Analysis>(retryText);
  }

  const tokens: TokenUsage = {
    prompt: promptT,
    candidates: candidatesT,
    thoughts: thoughtsT,
    total,
    search_requests: searches,
    cost_usd: Number(calcCost(promptT, candidatesT + thoughtsT, searches).toFixed(6)),
  };

  return { analysis, tokens };
}

async function analyzeCompatibility(
  ingredients: Product["ingredients"],
  profile: HealthProfile
): Promise<{ compatibility: Compatibility; tokens: TokenUsage }> {
  const allIngredients = [
    ...(ingredients?.good ?? []),
    ...(ingredients?.okay ?? []),
    ...(ingredients?.bad ?? []),
  ]
    .map((i) => `- ${i.name}`)
    .join("\n");

  const profileText = `Dietary preferences: ${profile.dietary_preferences.join(", ") || "none"}
Food allergies: ${profile.food_allergies.join(", ") || "none"}
Ingredient sensitivities: ${profile.ingredient_sensitivities.join(", ") || "none"}
Skin sensitivities: ${profile.skin_allergies.join(", ") || "none"}
Health conditions: ${profile.health_conditions.join(", ") || "none"}`;

  const contents = [
    {
      role: "user" as const,
      parts: [
        {
          text: `Evaluate how compatible the following product ingredients are with the user's personal health profile.

Ingredients:
${allIngredients}

User Health Profile:
${profileText}

Return a compatibility_level (VERY HIGH, HIGH, MEDIUM, LOW, or NONE) and a concise reason referencing the user's specific profile. If the profile has no restrictions, return VERY HIGH.`,
        },
      ],
    },
  ];

  const result = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      temperature: 0.3,
      maxOutputTokens: 2048,
      systemInstruction: `You are a personal health compatibility analyst. Accurately evaluate product ingredients against the user's allergies, sensitivities, diet, and health conditions.`,
      responseMimeType: "application/json",
      responseSchema: compatibilitySchema,
    },
  });

  const text = extractOutputText(result);
  if (!text) throw new Error("Empty response from Gemini (compatibility)");
  console.log(`[analyzeCompatibility] Response length: ${text.length} chars`);

  const usage = (result as any).usageMetadata ?? {};
  let promptT    = usage.promptTokenCount ?? 0;
  let candidatesT = usage.candidatesTokenCount ?? 0;
  let thoughtsT  = usage.thoughtsTokenCount ?? 0;
  let total      = usage.totalTokenCount ?? promptT + candidatesT + thoughtsT;

  let compatibility: Compatibility;
  try {
    compatibility = parseModelJSON<Compatibility>(text);
  } catch (err) {
    console.log(`[Retry] analyzeCompatibility — ${(err as Error).message}`);
    const retryResult = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        temperature: 0,
        maxOutputTokens: 2048,
        systemInstruction: "Return ONLY valid JSON. Do not truncate. Do not include explanations.",
        responseMimeType: "application/json",
        responseSchema: compatibilitySchema,
      },
    });
    const retryText = extractOutputText(retryResult);
    if (!retryText) throw new Error("Empty response from Gemini (compatibility retry)");
    console.log(`[Retry] analyzeCompatibility response length: ${retryText.length} chars`);
    const ru = (retryResult as any).usageMetadata ?? {};
    promptT    += ru.promptTokenCount ?? 0;
    candidatesT += ru.candidatesTokenCount ?? 0;
    thoughtsT  += ru.thoughtsTokenCount ?? 0;
    total      += ru.totalTokenCount ?? 0;
    compatibility = parseModelJSON<Compatibility>(retryText);
  }

  const tokens: TokenUsage = {
    prompt: promptT,
    candidates: candidatesT,
    thoughts: thoughtsT,
    total,
    search_requests: 0,
    cost_usd: Number(calcCost(promptT, candidatesT + thoughtsT, 0).toFixed(6)),
  };

  return { compatibility, tokens };
}

// ─── Formatter ────────────────────────────────────────────────────────────────

function formatProduct(product: Product): string {
  const { product_name, brand, health_score, ingredients } = product;
  const score = health_score ?? 0;
  const emoji = score >= 70 ? "🟢" : score >= 40 ? "🟡" : "🔴";

  let msg = "";
  if (product_name) msg += `*${product_name}*`;
  if (brand) msg += ` by _${brand}_`;
  if (msg) msg += "\n\n";
  msg += `${emoji} *Health Score: ${score}/100*\n\n`;

  if (ingredients?.good && ingredients.good.length > 0) {
    msg += `✅ *Good Ingredients*\n`;
    for (const i of ingredients.good) msg += `• *${i.name}* — ${i.reason}\n`;
    msg += "\n";
  }
  if (ingredients?.okay && ingredients.okay.length > 0) {
    msg += `⚪ *Okay Ingredients*\n`;
    for (const i of ingredients.okay) msg += `• *${i.name}* — ${i.reason}\n`;
    msg += "\n";
  }
  if (ingredients?.bad && ingredients.bad.length > 0) {
    msg += `❌ *Bad Ingredients*\n`;
    for (const i of ingredients.bad) msg += `• *${i.name}* — ${i.reason}\n`;
  }

  return msg.trim();
}

function formatCompatibility(compatibility: Compatibility): string {
  const { compatibility_level, reason } = compatibility;
  const emoji =
    compatibility_level === "VERY HIGH" ? "🟢" :
    compatibility_level === "HIGH"      ? "🟢" :
    compatibility_level === "MEDIUM"    ? "🟡" :
    compatibility_level === "LOW"       ? "🟠" :
    "🔴";
  return `🧬 *Personal Compatibility: ${compatibility_level}* ${emoji}\n\n${reason}`.trim();
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
    "Profile reset! Let's start fresh.\n\n" + QUESTIONS[0]!.prompt,
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
    await ctx.reply(QUESTIONS[0]!.prompt, { parse_mode: "Markdown" });
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
      await ctx.reply(QUESTIONS[0]!.prompt, { parse_mode: "Markdown" });
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
    await ctx.reply(QUESTIONS[0]!.prompt, { parse_mode: "Markdown" });
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
  let thinkingDeleted = false;
  const deleteThinking = async () => {
    if (!thinkingDeleted) {
      await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id).catch(() => {});
      thinkingDeleted = true;
    }
  };

  try {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];
    if (!photo) throw new Error("No photo found");

    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const res = await fetch(fileLink.href);
    const original = Buffer.from(await res.arrayBuffer());

    const compressed = await compressImage(original);
    const imageBase64 = compressed.toString("base64");
    const { width, height } = await sharp(compressed).metadata();
    console.log(`[Image] ${width}x${height}, ${compressed.length}B`);

    const profile: HealthProfile = {
      dietary_preferences:      user.dietary_preferences,
      food_allergies:           user.food_allergies,
      ingredient_sensitivities: user.ingredient_sensitivities,
      skin_allergies:           user.skin_allergies,
      health_conditions:        user.health_conditions,
    };

    // ── Step 1: Lightweight extraction (cheap, no search) ────────────────────
    const { extraction, tokens: tokensE } = await extractBasicProductInfo(imageBase64);

    if (!extraction.is_product) {
      await deleteThinking();
      await ctx.reply(
        `That doesn't look like a packaged product. ${extraction.rejection_reason || "Please send a photo of a food or cosmetic product."}`
      );
      return;
    }

    // ── Step 2: Fuzzy match against products DB ──────────────────────────────
    let product: Product | null = null;
    let totalTokens: TokenUsage = tokensE;

    const cached = await fuzzyFindProduct(extraction.brand, extraction.product_name);

    if (cached) {
      product = cached;
      console.log(`[Cache HIT] "${extraction.brand} / ${extraction.product_name}" → ${product.id}`);
    } else {
      // ── Step 3: Deep analysis (cache miss) — expensive, uses web search ───
      console.log(`[Cache MISS] "${extraction.brand} / ${extraction.product_name}" — running deep analysis`);
      const { analysis, tokens: tokensD } = await analyzeProductDeep(imageBase64);
      totalTokens = combineTokens(tokensE, tokensD);

      if (!analysis.is_product) {
        await deleteThinking();
        await ctx.reply(
          `That doesn't look like a packaged product. ${analysis.rejection_reason || "Please send a photo of a food or cosmetic product."}`
        );
        return;
      }

      try {
        product = await createOrGetProductFromAnalysis(analysis);
      } catch (err) {
        console.error("Product save failed:", err);
      }
    }

    await deleteThinking();

    if (!product) {
      await ctx.reply("Sorry, I couldn't process this product. Please try again.");
      return;
    }

    // Message 1: ingredient breakdown
    await ctx.reply(formatProduct(product), { parse_mode: "Markdown" });

    // ── Step 4: Personal compatibility ───────────────────────────────────────
    // ALWAYS runs a fresh Gemini call — never cached, never reused.
    // cache_hit above is product-level only and has no effect here.
    let savedCompatibility: Compatibility | null = null;
    try {
      const { compatibility, tokens: tokensC } = await analyzeCompatibility(product.ingredients, profile);
      savedCompatibility = compatibility;
      totalTokens = combineTokens(totalTokens, tokensC);
      // Message 2: compatibility rating
      await ctx.reply(formatCompatibility(compatibility), { parse_mode: "Markdown" });
    } catch (err) {
      console.error("Compatibility analysis failed:", err);
      await ctx.reply(
        "I couldn't evaluate personal compatibility, but the ingredient analysis above is still valid."
      );
    }

    await saveScan(ctx.from, {
      timestamp: new Date().toISOString(),
      product_id: product.id,
      cache_hit: !!cached,
      compatibility: savedCompatibility,
      tokens: totalTokens,
    });

    const cacheLabel = cached ? "cache" : "deep";
    console.log(
      `[Scan/${cacheLabel}] @${ctx.from.username ?? id} — ${product.product_name ?? "?"} by ${product.brand ?? "?"} — tokens: ${totalTokens.total}, search: ${totalTokens.search_requests ? "yes" : "no"}, cost: $${totalTokens.cost_usd}`
    );
  } catch (error) {
    console.error("Analysis error:", error);
    await deleteThinking();
    await ctx.reply("Sorry, I couldn't analyze that image. Please try again.");
  }
});

// ─── Launch ───────────────────────────────────────────────────────────────────

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
