const { MessageEmbed } = require("discord.js")
const { cli } = require("winston/lib/winston/config")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = '서포트서버'
        this.aliases = ["suppport-server"]
        this.category = 'genaral'
        this.permissions = ['Everyone']
        this.usage = '없습니다.'
        this.description = '봇의 핑력을 확인합니다(?)'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client }) {

const embed = new MessageEmbed()
.setTitle("서포트 서버")
.setDescription(`1 • [Team Alpha](https://alphakr.xyz/discord)\n2 • [Team Leo](https://discord.gg/n2KUDk7)\n3 • [하늘봇 커뮤니티](https://discord.gg/fjTaAWKK9D)`)
.setColor(this.client.config.color)
.setThumbnail(this.client.user.displayAvatarURL())
.setFooter(`${message.author.tag}`,message.author.displayAvatarURL({size:1024, dynamic: true, format: 'webp'??'png'??'gif'}))
.setTimestamp()
message.channel.send(message.author,embed)
        


    }
}

module.exports = Command