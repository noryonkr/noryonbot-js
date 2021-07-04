const { MessageEmbed } = require("discord.js")
const { cli } = require("winston/lib/winston/config")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'invite'
        this.aliases = ["핑"]
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
.setTitle("저를 초대해주세요")
.setDescription(`초대할려면 [클릭](http://skybluebot.kro.kr)을 해주세요`)
.setTimestamp()
.setColor(this.client.config.color)
.setFooter(`${message.author.tag} • ${new Date()}`,message.author.displayAvatarURL({size:1024, dynamic: true, format: 'webp'??'png'??'gif'}))
message.channel.send(message.author,embed)
        


    }
}

module.exports = Command