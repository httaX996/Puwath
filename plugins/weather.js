const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

// 🔰 Bot Info & Quoted Message
const botname = "𝙺𝙰𝚅𝙸 𝙼𝙳"; // add your name
const ownername = "𝙺𝙰𝚅𝙸𝙳𝚄 𝚁𝙰𝚂𝙰𝙽𝙶𝙰"; // add your name
const Supunwa = {
  key: {
    remoteJid: 'status@broadcast',
    participant: '0@s.whatsapp.net'
  },
  message: {
    newsletterAdminInviteMessage: {
      newsletterJid: '120363417070951702@newsletter', // add your channel jid
      newsletterName: "MOVIE CIRCLE", // add your bot name
      caption: botname + ` 𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳 𝙱𝚈 ` + ownername,
      inviteExpiration: 0
    }
  }
};

// 🌤 Weather Command
cmd({
  pattern: "weather",
  desc: "🌤 Get weather information for a location",
  react: "🌤",
  category: "convert",
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❗ නගරයක නමක් දෙන්න eg: .weather [city name]");
    
    const apiKey = '2d61a72574c11c4f36173b627f8cb177';
    const city = q;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    const data = response.data;

    const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍
🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

> *ᴘᴏᴡᴇʀᴅ ʙʏ ᴋᴀᴠɪᴅᴜ ʀᴀꜱᴀɴɢᴀ : )*`;

    return await conn.sendMessage(from, { text: weather }, { quoted: Supunwa }); // ✅ Use custom quoted

  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 404) {
      return reply("🚫 City not found. Please check the spelling and try again.");
    }
    return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
  }
});
