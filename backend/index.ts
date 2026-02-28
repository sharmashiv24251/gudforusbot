import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set in .env");

// To get a sticker file_id: send any sticker to your bot while it's running,
// the bot will reply with the file_id. Copy it and set HAPPY_STICKER_ID in .env.
const HAPPY_STICKER_ID = process.env.HAPPY_STICKER_ID;

const bot = new Telegraf(BOT_TOKEN);

// When someone sends any text message, reply with a sticker + "Hey!"
bot.on(message("text"), async (ctx) => {
  if (HAPPY_STICKER_ID) {
    await ctx.replyWithSticker(HAPPY_STICKER_ID);
  }
  await ctx.reply("Hey!");
});

// Helper: if someone sends the bot a sticker, reply with its file_id
// so you can copy it and set HAPPY_STICKER_ID in .env
bot.on(message("sticker"), async (ctx) => {
  const fileId = ctx.message.sticker.file_id;
  await ctx.reply(`Sticker file_id: \`${fileId}\``, { parse_mode: "Markdown" });
  console.log("Sticker file_id:", fileId);
});

bot.launch();
console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
