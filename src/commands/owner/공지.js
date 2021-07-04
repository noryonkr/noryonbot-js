const { MessageEmbed } = require("discord.js")


class Command {
    constructor (client) {
        this.client = client
        this.name = '공지'
        this.aliases = ['notice']
        this.category = 'owner'
        this.permissions = ['admin']
        this.usage = 's!ban <Text>'
        this.description = '모든서버에 공지 전송'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }

    }

    async run ({ message, client, args}) {


if (!message.author.id == [this.client.config.owners])
    return message.reply("개발자 권한이없습니다.\n> ⛔ Not Permission Developer."); // bot.js에서 client.devs를 저장한 것을 불러와 포함하지 않으면 해당 메세지로 답변해줍시다.


    if (!args.join(" ")) return message.channel.send("내용을 작성해주세요!");

        message.channel.send(new MessageEmbed().setTitle(`공지사항`).setDescription(`\`\`\`\n${args.join(" ")}\n\`\`\``).setColor("BLUE")).then(async th => {
            await th.react("⭕");
            await th.react("❌");
            
            th.awaitReactions((reaction, user) => (reaction.emoji.name === "❌" || reaction.emoji.name === "⭕") && user.id === message.author.id, {
                max: 1
            }).then(collected => {
                if (collected.array()[0].emoji.name === "⭕") {
                    let result = '';
th.edit(new MessageEmbed().setTitle('공지사항이 전송되었습니다.').setColor(this.client.config.color))
                    this.client.guilds.cache.forEach(g => {
                        let gc;

                        g.channels.cache.forEach(c => {
                            if (c.name.includes("봇-공지")||c.name.includes("하늘")||c.name.includes("🤖ㅣ봇-공지")||c.name.includes("봇공지")||c.name.includes("명령어")) gc = c.id;
                        
                        
                        });
                        if (!gc && (g.channels.cache.some(x => x.type == 'text' && x.permissionsFor(this.client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])))) gc = g.channels.cache.filter(x => x.type == 'text' && x.permissionsFor(this.client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])).random().id; 
                        const Ch = this.client.channels.cache.get(gc);
                        try {
                         
                            if (!Ch) return message.author.send(`${g.name}: 발신 실패 (채널 없음)\n`).then((m) => {
                              
                            })
                            if (!Ch.permissionsFor(g.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return message.author.send(`${g.name}: 발신 실패 (메시지 발신 실패)\n`)
                            
                            Ch.send(new MessageEmbed().setTitle(`📌하늘 공지`).setThumbnail(this.client.user.displayAvatarURL()).setDescription(args.join(" ")+"\n---------------\n📌[Team Alpha](https://alphakr.xyz)\n📌[Team Leo™](https://discord.gg/n2KUDk7)\n📌[하늘봇 커뮤니티](https://discord.gg/fjTaAWKK9D)").setColor("BLUE").setFooter(message.author.tag, message.author.displayAvatarURL()).setTimestamp())
                        } catch (e) {
                            message.author.send(`에러가 발생하였습니다.\n${e.message || e}`)
                        }
                    })
                } else {
                    th.edit(new MessageEmbed().setTitle("공지사항 발신이 취소되었습니다.").setColor(0x00ff00))
                }
            })
        })




  }
}



module.exports = Command