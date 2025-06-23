const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

// Quoted object for watermark credit
const botname = "𝙺𝙰𝚅𝙸 𝙼𝙳"; // Change only if needed
const ownername = "𝙺𝙰𝚅𝙸𝙳𝚄 𝚁𝙰𝚂𝙰𝙽𝙶𝙰"; // Change only if needed

const Supunwa = {
    key: {
        remoteJid: 'status@broadcast',
        participant: '0@s.whatsapp.net'
    },
    message: {
        newsletterAdminInviteMessage: {
            newsletterJid: '', // your WhatsApp Channel ID
            newsletterName: "", // Your bot/channel name
            caption: botname + ` 𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳 𝙱𝚈 ` + ownername,
            inviteExpiration: 0
        }
    }
};

cmd({
    pattern: "system",
    alias: ["status", "botinfo"],
    desc: "Check uptime, RAM usage, and more",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, reply
}) => {
    try {
        let status = `
╭╶━━━━━━━━━━━━━━━━━━━━◆➤
┃❖ *Uptime:*  ${runtime(process.uptime())}
┃
┃❖ *RAM Usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃
┃❖ *Host Name:* ${os.hostname()}
┃
┃❖ *Owner:* Kavidu Rasanga 
╰╶━━━━━━━━━━━━━━━━━━━━◆➤`;

        await conn.sendMessage(from, {
            text: status
        }, { quoted: Supunwa });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
