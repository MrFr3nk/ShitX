import {
  promises,
  readFileSync
 } from "fs"
 import {
  join
 } from "path"
 import {
  xpRange
 } from "../lib/levelling.js"
 import moment from "moment-timezone"
 import os from "os"
 import fs from "fs"
 import fetch from "node-fetch"
 
 const defaultMenu = {
  before: `
  「 ${botname}  」\n
  *%ucpn*
┏────────────────✧
┃   *𝙷𝙴𝙻𝙻𝙾 𝚂𝙴𝙽𝙿𝙰𝙸*
┃   *𝙸𝙰𝙼 𝚂𝚄𝙱𝚉𝙴𝚁𝙾-𝙼𝙳*
┃┠───────────────✧
┃  *𝙼𝙰𝙳𝙴 𝙾𝙽 𝙿𝙻𝚄𝚃𝙾 𝙱𝚈*
┃   *© 𝙼𝚁 𝙵𝚁𝙰𝙽𝙺*
┃┠───────────────✧
┃ *𝚃𝙷𝙸𝚂 𝙱𝙾𝚃 𝙸𝚂 𝙰 𝚁𝙴𝚂𝚄𝙻𝚃* 
┃ *𝙾𝙵 𝙼𝚁 𝙵𝚁𝙰𝙽𝙺𝚂 𝙷𝙰𝚁𝙳𝚆𝙾𝚁𝙺*
┃ *𝚁𝙴𝙲𝙾𝙳𝙸𝙽𝙶 𝙸𝚂 𝙿𝚄𝙽𝙸𝚂𝙷𝙰𝙱𝙻𝙴*
┃
┃ © 𝙰𝙻𝙻 𝚁𝙸𝙶𝙷𝚃𝚂 𝚁𝚁𝙴𝚂𝙴𝚁𝚅𝙴𝙳
╚────────────────✧
                                    
 ⚡ 𝙎𝙐𝘽𝙕𝙀𝙍𝙊  -  𝙈𝘿⚡
 
┍─────────────────✧
┃ ❄️〘 *𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽*〙❄️
┗┬────────────────✧
┌┤
┃
┃ *𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁*: 𝙼𝚁 𝙵𝚁𝙰𝙽𝙺 
┃ *𝙱𝙾𝚃 𝙽𝙰𝙼𝙴* : ${botname}
┃ *𝙼𝙾𝙳𝙴*     : %mode
┃ *𝙷𝙾𝚂𝚃 𝙿𝙻𝙰𝚃*: kali Linix
┃ *𝙻𝙰𝙽𝙶𝚄𝙰𝙶𝙴* : NodeJs
┃ *𝚂𝚈𝚂𝚃𝙴𝙼*   : Multi Device
┃ *𝙿𝚁𝙴𝙵𝙸𝚇*   : [ *%_p* ]
┃ *𝙿𝚁𝙴𝙵𝙸𝚇*   : %muptime
┃ *𝙳𝙰𝚃𝙰𝙷𝙰𝚂𝙴* :  %totalreg
┃
┗──────────────────✦
┏──────────────────✧
┃ ❄️〘 *𝚈𝙾𝚄𝚁 𝙸𝙽𝙵𝙾* 〙❄️
┗┬─────────────────✦
┌┤     
┃
┃ *𝙽𝙰𝙼𝙴*: %name
┃ 
┃ 
┃
┗──────────────────✧
╭──────────────────✦
┃   ❄️〘 𝚃𝙾𝚃𝙰𝙻 𝙲𝙼𝙳𝚂 〙❄️
┗┬─────────────────✧
┌┤ 
┃ *_%totalfeatures_* 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂✨
┗──────────────────✦


 `.trimStart(),
 header: "┏─❐『 *❄%category❄* 』❐",
 body: "┃✲ %cmd %isPremium %islimit",
 footer: "┗─────────────────✦",
 after: "\n%me",
 }
 let handler = async (m, {
  conn,
  usedPrefix: _p,
  __dirname,
  args
 }) => {
  await conn.sendMessage(m.chat, {
   react: {
 text: "🇿🇼",
 key: m.key,
   }
  })
  
  let tags = {}
  
  try {
  
   /* Info Menu */
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = process.env.MODE || (global.opts["self"] ? "Private" : "Public");
   let _package = JSON.parse(await promises.readFile(join(__dirname, "../package.json")).catch(_ => ({}))) || {}
   let {
 age,
 exp,
 limit,
 level,
 role,
 registered,
 credit
   } = glb[m.sender]
   let {
 min,
 xp,
 max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
 
 
   let ucpn = `${ucapan()}`
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
 process.send("uptime")
 _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
 }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
 
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
   let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
 return {
  help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
  tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
  prefix: "customPrefix" in plugin,
  limit: plugin.limit,
  premium: plugin.premium,
  enabled: !plugin.disabled,
 }
   })
   for (let plugin of help)
 if (plugin && "tags" in plugin)
  for (let tag of plugin.tags)
   if (!(tag in tags) && tag) tags[tag] = tag
   conn.menu = conn.menu ? conn.menu : {}
   let before = conn.menu.before || defaultMenu.before
   let header = conn.menu.header || defaultMenu.header
   let body = conn.menu.body || defaultMenu.body
   let footer = conn.menu.footer || defaultMenu.footer
   let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? "" : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
   let _text = [
 before,
 ...Object.keys(tags).map(tag => {
  return header.replace(/%category/g, tags[tag]) + "\n" + [
   ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
 return menu.help.map(help => {
  return body.replace(/%cmd/g, menu.prefix ? help : "%_p" + help)
   .replace(/%islimit/g, menu.limit ? "Ⓛ" : "")
   .replace(/%isPremium/g, menu.premium ? "🅟" : "")
   .trim()
 }).join("\n")
   }),
   footer
  ].join("\n")
 }),
 after
   ].join("\n")
   let text = typeof conn.menu == "string" ? conn.menu : typeof conn.menu == "object" ? _text : ""
   let replace = {
 "%": "%",
 p: _p,
 uptime,
 muptime,
 me: conn.getName(conn.user.jid),
 npmname: _package.name,
 npmdesc: _package.description,
 version: _package.version,
 exp: exp - min,
 maxexp: xp,
 totalexp: exp,
 xp4levelup: max - exp,
 github: _package.homepage ? _package.homepage.url || _package.homepage : "[unknown github url]",
 tag,
 ucpn,
 platform,
 mode,
 _p,
 credit,
 age,
 tag,
 name,
 prems,
 level,
 limit,
 name,
 totalreg,
 totalfeatures,
 role,
 readmore: readMore
   }
   text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name])
   const pp = './Assets/XLICON-V2.jpg'
  
 
 let contact = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
 
  conn.sendMessage(m.chat, { video: { url: menuvid }, caption: text.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: contact })

  } catch (e) {
   await conn.reply(m.chat, " error", m)
   throw e
  }
 }
 handler.command = /^(menu|help|\?)$/i
 

 
 export default handler
 
 
 function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
 }
 
 const more = String.fromCharCode(8206)
 const readMore = more.repeat(4001)
 
 function clockString(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
 }
 
 function clockStringP(ms) {
  let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
  return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
 }
 
 function ucapan() {
  const time = moment.tz("Asia/Kolkata").format("HH")
  let res = "Good morning ☀️"
  if (time >= 4) {
   res = "Good Morning 🌄"
  }
  if (time >= 10) {
   res = "Good Afternoon ☀️"
  }
  if (time >= 15) {
   res = "Good Afternoon 🌇"
  }
  if (time >= 18) {
   res = "Good Night 🌙"
  }
  return res
 }
