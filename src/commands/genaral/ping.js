const { MessageEmbed } = require("discord.js")
const { cli } = require("winston/lib/winston/config")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'ping'
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
        .setTitle("퐁!")
        .setDescription(`${this.client.ws.ping}ms`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setColor('#63aaf7')
        .setThumbnail('https://cdn.discordapp.com/attachments/820186973624074240/850296846311489542/4_20210604175520.png')
        message.channel.send(embed)
        
    }
}

module.exports = Command