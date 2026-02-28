import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env");

const HAPPY_STICKER_ID = process.env.HEYYY_STICKER;

const bot = new Telegraf(BOT_TOKEN);

// --- db.json helpers ---
const DB_PATH = new URL("./db.json", import.meta.url).pathname;

type DB = { users: Record<string, { messageCount: number }> };

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

// --- Message handler ---
bot.on(message("text"), async (ctx) => {
  const userId = String(ctx.from.id);
  const db = await loadDB();

  if (!db.users[userId]) {
    db.users[userId] = { messageCount: 0 };
  }

  db.users[userId].messageCount += 1;
  const count = db.users[userId].messageCount;
  await saveDB(db);

  if (count === 1) {
    if (HAPPY_STICKER_ID) {
      await ctx.replyWithSticker(HAPPY_STICKER_ID);
    }
    await ctx.reply("Hey!");
  } else if (count === 2) {
    await ctx.reply(
      "Please send a photo of a packaged food or cosmetic product and I will analyze its health score and ingredients for you!"
    );
  }
});

// Helper: reply with sticker file_id when someone sends a sticker
bot.on(message("sticker"), async (ctx) => {
  const fileId = ctx.message.sticker.file_id;
  await ctx.reply(`Sticker file_id: \`${fileId}\``, { parse_mode: "Markdown" });
  console.log("Sticker file_id:", fileId);
});

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
