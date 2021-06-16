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
      let wait = await message.channel.send(`<a:load6:691681971478462495> Please wait..`)

        const embed = new MessageEmbed()
        .setTitle(`<a:load6:691681971478462495> 현재 핑!`)
        .addField('<:qkddj:687558950266077206> Delay', `__**${wait.createdTimestamp - message.createdTimestamp}ms**__`)
            .addField(`\n<:wifi:687558950421397509> **Ping**`, `__**${Math.round(this.client.ws.ping)}ms**__`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setColor('#63aaf7')
        .setThumbnail('https://cdn.discordapp.com/attachments/820186973624074240/850296846311489542/4_20210604175520.png')
        await wait.edit('',embed)
        


    }
}

module.exports = Command