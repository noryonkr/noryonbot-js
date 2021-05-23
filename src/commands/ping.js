const { MessageEmbed } = require("discord.js")
const { cli } = require("winston/lib/winston/config")

class Command {
    constructor (client) {
        this.client = client
        this.name = 'ping'
        this.aliases = ["핑"]
        this.category = '기본'
        this.permissions = ['Everyone']
        this.usage = ''
        this.description = ''
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message }) {
        const embed = new MessageEmbed()
        .setTitle("핑")
        .setDescription(`${this.client.ping.ws}ms`)
        message.channel.send(embed)
        
    }
}

module.exports = Command