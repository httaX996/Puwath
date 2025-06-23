const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const botname = "𝙺𝙰𝚅𝙸 𝙼𝙳"; //add your name
 const ownername = "𝙺𝙰𝚅𝙸𝙳𝚄 𝚁𝙰𝚂𝙰𝙽𝙶𝙰"; // add your name
 const Supunwa = { 
 key: { 
  remoteJid: 'status@broadcast', 
  participant: '0@s.whatsapp.net' 
   }, 
message:{ 
  newsletterAdminInviteMessage: { 
    newsletterJid: '120363417070951702@newsletter', //add your channel jid
    newsletterName: "MOVIE CIRCLE", //add your bot name
    caption: botname + ` 𝚅𝙴𝚁𝙸𝙵𝙸𝙴𝙳 ` + ownername, 
    inviteExpiration: 0
  }
 }
};

cmd({
    pattern: "system",
    alias: ["status","botinfo"],
    desc: "check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumner, botNumner2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
╭╶━━━━━━━━━━━━━━━━━━━━◆➤
┃❖ *Uptime:*  ${runtime(process.uptime())}
┃
┃❖ *Ram usage:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃
┃❖ *HostName:* ${os.hostname()}
┃
┃❖ *Owner:* *Kavidu Rasanga*
╰╶━━━━━━━━━━━━━━━━━━━━◆➤`
  return await conn.sendMessage(from, { text: system }, { quoted: Supunwa }); // ✅ Use custom quoted


}catch(e){
console.log(e)
reply(`${e}`)

}
})
