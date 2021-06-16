const Discord = require('discord.js');
class Command {
    constructor (client) {
        this.client = client
        this.name = 'uptime'
        this.aliases = ['업타임']
        this.category = 'genaral'
        this.permissions = ['Everyone']
        this.usage = ''
        this.description = '봇이 실행된 시간을 알려줌.'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client}) {

        const moment = require("moment");
        require("moment-duration-format");
        const Up = moment.duration(this.client.uptime).format("`D[일] H[시간] m[분] s[초]`")

        const embed = new Discord.MessageEmbed()
        .setTitle(`<:tlrP:687558950538707036> 봇이 실행된 시간입니다!`)
        .setDescription(`지금 까지 ${Up} 동안 실행되었어요!`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/733958435091251254/826403382713253918/8d43f4bb2e851cbe.png`)
        .setColor('#63aaf7')
        .setTimestamp()
        message.channel.send(embed)
    }
}

module.exports = Command