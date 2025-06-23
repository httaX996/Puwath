const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

cmd({
    pattern: "mv1",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
👻 *𝙏itle ➼* _${data.Title}_
🌟 *𝙍ated ➼* _${data.Rated}_
📆 *𝙍eleased ➼* _${data.Released}_
⏳ *𝙍untime ➼* _${data.Runtime}_
🎭 *𝙂enre ➼* _${data.Genre}_
✍️ *𝙒riter ➼* _${data.Writer}_
🎭 *𝘼ctors ➼* _${data.Actors}_
🇺🇸 *𝘾ountry ➼* _${data.Country}_
⭐ *𝙄MDB Rating ➼* _${data.imdbRating}_

*⚘━━━━━━━╶╶╶╶━━━━━━━⚘*

*𝐌𝐎𝐕𝐈𝐄 𝐑𝐄𝐐𝐔𝐄𝐒𝐓 𝐆𝐑𝐎𝐔𝐏 _~➙ https://chat.whatsapp.com/IkQ2yh3qDXG8fTyJdnSKSA~_*

*𝐌𝐎𝐕𝐈𝐄 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 ~_➙ https://whatsapp.com/channel/0029Vb5xFPHGE56jTnm4ZD2k_~*

*_𝐌𝐎𝐕𝐈𝐄 𝐆𝐑𝐎𝐔𝐏➙ ~https://chat.whatsapp.com/K7UM5Jk6Igu0tnQMPhPRJj~_*

*𝐓𝐕 𝐒𝐄𝐑𝐈𝐄𝐒 𝐆𝐑𝐎𝐔𝐏 ➙ ~_https://chat.whatsapp.com/EThzlx8sOrMKRDkXSHpSqG_~*

*⚘━━━━━━━╶╶╶╶━━━━━━━⚘*
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> *ᴘᴏᴡᴇʀᴅ ʙʏ  ᴋᴀᴠɪᴅᴜ ʀᴀꜱᴀɴɢᴀ : )*`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
