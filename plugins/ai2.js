const config = require('../config')
const {cmd, commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    alias: ["laki6"], 
    react: "📑",
    desc: "ai chat.",
    category: "main",
    filename: __filename
},
async(conn, mek, m, {from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        // Check if the user is asking who made it
        if (q.toLowerCase().includes("කවුද හැදුවේ") || q.toLowerCase().includes("who made this")) {
            return reply(`මේක හැදුවේ *කවිදු රසාංග* කියන කොල්ලා බ්‍රෝ! 😎 මාර වැඩ්ඩෙක් උ, තව අහින්සක කොල්ලෙක් 🔥`)
        }

        // Normal AI response
        let data = await fetchJson(`https://dark-shan-yt.koyeb.app/ai/gemini?q=${q}`)
        return reply(` ${data.data}\n\n> ᴘᴏᴡᴇʀᴅ ʙʏ  ᴋᴀᴠɪᴅᴜ ʀᴀꜱᴀɴɢᴀ : )`)
    } catch(e) {
        console.log(e)
        reply(`අයියෝ බ්‍රෝ, එරර් එකක්! 😂\n${e}`)
    }
})