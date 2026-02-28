import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { GoogleGenAI } from "@google/genai";

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
  cost_usd: number;
}

interface ScanRecord {
  timestamp: string;
  analysis: Analysis;
  tokens: TokenUsage;
}

interface UserRecord {
  scans: ScanRecord[];
}

type DB = { users: Record<string, UserRecord> };

// --- DB helpers ---

const DB_PATH = new URL("./db.json", import.meta.url).pathname;

async function loadDB(): Promise<DB> {
  try {
    return JSON.parse(await Bun.file(DB_PATH).text());
  } catch {
    return { users: {} };
  }
}

async function saveDB(db: DB) {
  await Bun.write(DB_PATH, JSON.stringify(db, null, 2));
}

async function saveScan(userId: string, scan: ScanRecord) {
  const db = await loadDB();
  if (!db.users[userId]?.scans) {
    db.users[userId] = { scans: [] };
  }
  db.users[userId].scans.push(scan);
  await saveDB(db);
}

// --- Gemini ---

const MODEL = "gemini-3-flash-preview";
// Pricing per 1M tokens
const PRICE = { input: 0.5, output: 3.0 };

function calcCost(promptTokens: number, outputTokens: number): number {
  // outputTokens = candidates + thoughts (both billed at output rate)
  return (
    (promptTokens / 1_000_000) * PRICE.input +
    (outputTokens / 1_000_000) * PRICE.output
  );
}

const responseSchema = {
  type: "object",
  properties: {
    is_product: { type: "boolean" },
    rejection_reason: { type: ["string", "null"] },
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
  required: ["is_product", "health_score", "ingredients"],
};

async function analyzeProductImage(
  imageBase64: string
): Promise<{ analysis: Analysis; tokens: TokenUsage }> {
  const result = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a health analyst. Analyze this product image.

If this is NOT a packaged food or cosmetic/personal care product, set is_product: false and explain in rejection_reason.

If it IS a product:
1. Give a health_score from 0-100 (100 = perfectly healthy, 0 = very harmful)
2. List ALL visible ingredients categorized:
   - good: beneficial ingredients with a brief reason why
   - okay: neutral/moderate ingredients with brief context
   - bad: harmful/unhealthy ingredients with a brief reason why

Use web search to get current ingredient safety data before categorizing.`,
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
  const prompt = usage.promptTokenCount ?? 0;
  const candidates = usage.candidatesTokenCount ?? 0;
  const thoughts = usage.thoughtsTokenCount ?? 0;
  const total = usage.totalTokenCount ?? prompt + candidates + thoughts;

  const tokens: TokenUsage = {
    prompt,
    candidates,
    thoughts,
    total,
    cost_usd: Number(calcCost(prompt, candidates + thoughts).toFixed(6)),
  };

  return { analysis: JSON.parse(text.trim()), tokens };
}

// --- Formatter ---

function formatAnalysis(analysis: Analysis): string {
  const { health_score, ingredients } = analysis;
  const scoreEmoji =
    health_score >= 70 ? "🟢" : health_score >= 40 ? "🟡" : "🔴";

  let msg = `${scoreEmoji} *Health Score: ${health_score}/100*\n\n`;

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
    "Please send a photo of a packaged food or cosmetic product and I will analyze its health score and ingredients for you!"
  );
});

bot.on(message("photo"), async (ctx) => {
  const thinking = await ctx.reply("Analyzing your product... 🔍");
  try {
    const photos = ctx.message.photo;
    const photo = photos[photos.length - 1];
    if (!photo) throw new Error("No photo found");

    const fileLink = await ctx.telegram.getFileLink(photo.file_id);
    const response = await fetch(fileLink.href);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    const { analysis, tokens } = await analyzeProductImage(base64);

    await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id);

    if (!analysis.is_product) {
      await ctx.reply(
        `That doesn't look like a packaged product. ${analysis.rejection_reason || "Please send a photo of a food or cosmetic product."}`
      );
      return;
    }

    // Save to db.json
    const userId = String(ctx.from.id);
    await saveScan(userId, {
      timestamp: new Date().toISOString(),
      analysis,
      tokens,
    });

    console.log(
      `[DB] Saved scan for user ${userId} — tokens: ${tokens.total}, cost: $${tokens.cost_usd}`
    );

    await ctx.reply(formatAnalysis(analysis), { parse_mode: "Markdown" });
  } catch (error) {
    console.error("Analysis error:", error);
    await ctx.telegram.deleteMessage(ctx.chat.id, thinking.message_id).catch(() => {});
    await ctx.reply(
      "Sorry, I couldn't analyze that image. Please try again with a clearer photo."
    );
  }
});

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
