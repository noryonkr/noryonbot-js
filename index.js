const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

client.login(config.token)

client.on("ready", console.log("로그인"))
client.on("message", msg => {
if(msg.content == config.prefix+"테스트") return msg.channel.send("안녕하세요")
})
