const { MessageEmbed } = require("discord.js")


class Command {
    constructor (client) {
        this.client = client
        this.name = '공식공지'
        this.aliases = ['식공']
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

        message.channel.send(new MessageEmbed().setTitle(`공식 서버(4개)에 공지를 올리시겠습니까?`).setDescription(`\`\`\`\n${args.join(" ")}\n\`\`\``).setColor("BLUE")).then(async th => {
            await th.react("⭕");
            await th.react("❌");
            
            th.awaitReactions((reaction, user) => (reaction.emoji.name === "❌" || reaction.emoji.name === "⭕") && user.id === message.author.id, {
                max: 1
            }).then(collected => {
                if (collected.array()[0].emoji.name === "⭕") {
const embed = new MessageEmbed()
.setTitle(`공식 공지사항`)
.setThumbnail(this.client.user.displayAvatarURL())
.setDescription(args.join(" ")+"\n---------------\n📌[Team Alpha](https://alpha.xyz/discord)\n📌[Team Leo™](https://discord.gg/n2KUDk7)\n📌[하늘봇 커뮤니티](https://discord.gg/fjTaAWKK9D)")
.setColor(this.client.config.color)
.setFooter(message.author.tag, message.author.displayAvatarURL())
.setTimestamp()

this.client.channels.cache.get('850993604079648839').send(embed)
this.client.channels.cache.get('733987666898583603').send(embed)
this.client.channels.cache.get('853222529799028756').send(embed)
                  
                } else {th.edit(new MessageEmbed().setColor('RED').setDescription("공지 보내기를 취소했습니다!"))}

            })
        })




  }
}



module.exports = Command