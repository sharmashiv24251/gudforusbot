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

// --- Types ---

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
  search_requests: number; // Track if a search actually happened
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

interface UserData {
  id: string;
  username: string | null;
  first_name: string;
  last_name: string | null;
  joined_at: string;
  total_scans: number;
  total_cost_usd: number;
}

type ResponsesDB = Record<string, UserScan>;
type UsersDB = Record<string, UserData>;

// --- Storage helpers ---

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

async function upsertUser(from: {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
}) {
  const db = await loadJSON<UsersDB>(USERS_PATH, {});
  const id = String(from.id);
  if (!db[id]) {
    db[id] = {
      id,
      username: from.username ?? null,
      first_name: from.first_name,
      last_name: from.last_name ?? null,
      joined_at: new Date().toISOString(),
      total_scans: 0,
      total_cost_usd: 0,
    };
  } else {
    db[id].username = from.username ?? null;
    db[id].first_name = from.first_name;
    db[id].last_name = from.last_name ?? null;
  }
  await saveJSON(USERS_PATH, db);
}

async function saveScan(
  from: { id: number; username?: string },
  scan: ScanRecord,
) {
  const id = String(from.id);

  const responses = await loadJSON<ResponsesDB>(RESPONSES_PATH, {});
  if (!responses[id]) {
    responses[id] = { username: from.username ?? null, scans: [] };
  }
  responses[id].username = from.username ?? null;
  responses[id].scans.push(scan);
  await saveJSON(RESPONSES_PATH, responses);

  const users = await loadJSON<UsersDB>(USERS_PATH, {});
  if (users[id]) {
    users[id].total_scans += 1;
    users[id].total_cost_usd = Number(
      (users[id].total_cost_usd + scan.tokens.cost_usd).toFixed(6),
    );
    await saveJSON(USERS_PATH, users);
  }
}

// --- Image processing ---

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 896, withoutEnlargement: true })
    .jpeg({ quality: 78 })
    .toBuffer();
}

// --- Gemini ---

const MODEL = "gemini-3-flash-preview";

// Current pricing metrics
const PRICE = {
  input: 0.5, // $0.50 per 1M tokens
  output: 3.0, // $3.00 per 1M tokens
  search: 35.0, // $35.00 per 1,000 search requests ($0.035 each)
};

function calcCost(
  promptTokens: number,
  outputTokens: number,
  searchRequests: number,
): number {
  return (
    (promptTokens / 1_000_000) * PRICE.input +
    (outputTokens / 1_000_000) * PRICE.output +
    (searchRequests / 1000) * PRICE.search
  );
}

const responseSchema = {
  type: "object",
  properties: {
    is_product: { type: "boolean" },
    rejection_reason: { type: ["string", "null"] },
    product_name: { type: ["string", "null"] },
    brand: { type: ["string", "null"] },
    health_score: { type: "integer", minimum: 0, maximum: 100 },
    ingredients: {
      type: "object",
      properties: {
        good: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              reason: { type: "string" },
            },
            required: ["name", "reason"],
          },
        },
        okay: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              reason: { type: "string" },
            },
            required: ["name", "reason"],
          },
        },
        bad: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              reason: { type: "string" },
            },
            required: ["name", "reason"],
          },
        },
      },
      required: ["good", "okay", "bad"],
    },
  },
  required: [
    "is_product",
    "product_name",
    "brand",
    "health_score",
    "ingredients",
  ],
};

async function analyzeProductImage(
  imageBase64: string,
): Promise<{ analysis: Analysis; tokens: TokenUsage }> {
  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze this image.
1. Extract the product_name and brand from the label.
2. Give a health_score from 0-100 (100 = perfectly healthy, 0 = very harmful).
3. List ALL visible ingredients categorized:
   - good: beneficial ingredients with a brief reason why.
   - okay: neutral/moderate ingredients with brief context.
   - bad: harmful/unhealthy ingredients with a brief reason why.`,
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
        ],
      },
    ],
    config: {
      temperature: 0.5,
      maxOutputTokens: 4096,
      // Moved the persona and strict rules to system instructions for better adherence
      systemInstruction: `Today is ${new Date().toDateString()}. You are an expert health and wellness analyst. Your job is to analyze images of packaged food or cosmetic/personal care products.
      
If the image is NOT a packaged food or cosmetic/personal care product, set is_product: false and explain why in rejection_reason.

You MUST use the googleSearch tool to cross-reference current ingredient safety data, recent FDA/EFSA rulings, and modern nutritional consensus before finalizing your categorization.`,
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

  // Extract Token Usage
  const usage = (result as any).usageMetadata ?? {};
  const prompt = usage.promptTokenCount ?? 0;
  const candidates = usage.candidatesTokenCount ?? 0;
  const thoughts = usage.thoughtsTokenCount ?? 0;
  const total = usage.totalTokenCount ?? prompt + candidates + thoughts;

  // Extract Search Usage from Grounding Metadata
  const groundingMetadata = (result as any).candidates?.[0]?.groundingMetadata;
  const webQueries = groundingMetadata?.webSearchQueries || [];
  const searchUsed = webQueries.length > 0 ? 1 : 0;

  if (searchUsed) {
    console.log(`[Grounding] Triggered web searches:`, webQueries);
  } else {
    console.log(`[Grounding] Relied on internal knowledge base.`);
  }

  const tokens: TokenUsage = {
    prompt,
    candidates,
    thoughts,
    total,
    search_requests: searchUsed,
    cost_usd: Number(
      calcCost(prompt, candidates + thoughts, searchUsed).toFixed(6),
    ),
  };

  return { analysis: JSON.parse(text.trim()), tokens };
}

// --- Formatter ---

function formatAnalysis(analysis: Analysis): string {
  const { product_name, brand, health_score, ingredients } = analysis;
  const scoreEmoji =
    health_score >= 70 ? "🟢" : health_score >= 40 ? "🟡" : "🔴";

  let msg = "";
  if (product_name) msg += `*${product_name}*`;
  if (brand) msg += ` by _${brand}_`;
  if (msg) msg += "\n\n";

  msg += `${scoreEmoji} *Health Score: ${health_score}/100*\n\n`;

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

// --- Handlers ---

bot.on(message("text"), async (ctx) => {
  await ctx.reply(
    "Please send a photo of a packaged food or cosmetic product and I will analyze its health score and ingredients for you!",
  );
});

bot.on(message("photo"), async (ctx) => {
  const thinking = await ctx.reply("Analyzing your product... 🔍");
  try {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];
    if (!photo) throw new Error("No photo found");

    await upsertUser(ctx.from);

    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const response = await fetch(fileLink.href);
    const originalBuffer = Buffer.from(await response.arrayBuffer());

    const compressed = await compressImage(originalBuffer);
    const { width, height } = await sharp(compressed).metadata();
    console.log(
      `[Image] Compressed: ${width}x${height}, ${compressed.length} bytes`,
    );

    const base64 = compressed.toString("base64");
    const { analysis, tokens } = await analyzeProductImage(base64);

    await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id);

    if (!analysis.is_product) {
      await ctx.reply(
        `That doesn't look like a packaged product. ${analysis.rejection_reason || "Please send a photo of a food or cosmetic product."}`,
      );
      return;
    }

    await saveScan(ctx.from, {
      timestamp: new Date().toISOString(),
      analysis,
      tokens,
    });

    console.log(
      `[Save] @${ctx.from.username ?? ctx.from.id} — ${analysis.product_name ?? "unknown"} by ${analysis.brand ?? "unknown"} — tokens: ${tokens.total}, search_used: ${tokens.search_requests ? "Yes" : "No"}, cost: $${tokens.cost_usd}`,
    );

    await ctx.reply(formatAnalysis(analysis), { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Analysis error:", error);
    await ctx.telegram
      .deleteMessage(ctx.chat.id, thinking.message_id)
      .catch(() => {});
    await ctx.reply(
      "Sorry, I couldn't analyze that image. Please try again with a clearer photo.",
    );
  }
});

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
