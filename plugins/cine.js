const { cmd } = require("../command");
const axios = require("axios");
const cheerio = require("cheerio");

cmd({
  pattern: "cinesubz",
  desc: "🔎 Search movies on Cinesubz.co",
  category: "movie",
  react: "🎬",
  filename: __filename
}, async (bot, mek, m, { from, args, reply }) => {
  try {
    if (!args[0]) return reply("⚠️ *Please provide a movie or series name to search!*");

    const query = args.join(" ");
    const url = "https://cinesubz.co/?s=" + encodeURIComponent(query);

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const $ = cheerio.load(data);
    const results = [];

    $(".result-item").each((i, el) => {
      const title = $(el).find(".title a").text().trim();
      const link = $(el).find(".title a").attr("href");
      const image = $(el).find(".thumbnail img").attr("src");
      const type = $(el).find(".thumbnail span").first().text().trim();
      const rating = $(el).find(".meta .rating").first().text().trim();
      const year = $(el).find(".meta .year").text().trim();
      const description = $(el).find(".contenido p").text().trim();

      results.push({ title, link, image, type, rating, year, description });
    });

    if (results.length === 0) {
      return reply("📭 *No results found for:* `" + query + "`");
    }

    let text = "╭──🎬 *CINESUBZ RESULTS* ──╮\n\n";

    results.slice(0, 5).forEach((item, idx) => {
      text += `*${idx + 1}. ${item.title}*\n`;
      if (item.type) text += `📺 Type: ${item.type}\n`;
      if (item.rating) text += `⭐ Rating: ${item.rating}\n`;
      if (item.year) text += `📅 Year: ${item.year}\n`;
      text += `🔗 ${item.link}\n\n`;
    });

    text += "──────────────\n> _Forwarded by Supun MD_\n📣 https://whatsapp.com/channel/0029VaXRYlrKwqSMF7Tswi38";

    await reply(text);

  } catch (err) {
    console.error("Cinesubz Scrape Error:", err.message);
    reply("❌ *Error while searching Cinesubz!*\nTry again later.");
  }
});
