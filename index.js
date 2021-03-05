const discord = require("discord.js")
const client = new discord.Client()
const {MessageEmbed} = require('discord.js')
const config = require("./config.json")

client.login(config.token)

client.on("ready", () => {
console.log(`잠시만 기달려 주세요.`)
setTimeout(()=> {console.log("=====================\n"+`봇 이름: ${client.user.tag}\n서버 수: ${client.guilds.cache.size}\n유저 수 : ${client.users.cache.size}\n====================`)
},1000)
})
const Dokdo = require("dokdo")
const dokdo = new Dokdo(client, {
	prefix: config.prefix,
	noPerm: (msg) => msg.reply("403 Permmision: 권한이 없습니다 돌아가세요"),
	owners: config.dev
	})
client.on("message", async msg => {
if(msg.author.bot) return
dokdo.run(msg)
const command = msg.content==config.prerix
client.prefix = config.prefix
if(msg.content==config.prefix+"핑"||msg.content==config.prefix+"ping") {
const embed = new MessageEmbed()
.setTitle("핑")
.setDescription(client.ws.ping+"ms 입니다")
.setColor(config.color)

msg.channel.send(embed)
console.log(msg.author.tag+": 핑(ping)의 명령어를 사용하였습니다")
}

if(msg.content==client.prefix+"dev"||msg.content==client.prefix+"개발자") {
	const d = client.users.cache.get(config.dev[0]).tag
	const embed = new MessageEmbed()
	.setTitle("개발자")
	.setDescription(`운영자: \`${d}\``)
	.setColor(config.color)
	msg.channel.send(embed)
	console.log(msg.author.tag+": 개발자(dev)의 명령어를 사용하였습니다")
	}
	
	if(msg.content==config.prefix+"서버정보"||msg.content==config.prefix+"si") {
		const embed = new MessageEmbed()
		.setTitle("`"+msg.guild.name+"`의 서버정보")
		.addField("유저", `멤버: ${msg.guild.members.cache.size}`)
	msg.channel.send(embed)
}
})



client.on("error", ()=> console.error)