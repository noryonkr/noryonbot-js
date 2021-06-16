const { MessageEmbed } = require("discord.js")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = '일시중지'
        this.aliases = ["pause","pu"]
        this.category = 'music'
        this.permissions = ['Everyone']
        this.usage = '없습니다.'
        this.description = '재생'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client }) {
         if (!message.member.voice.channel) return message.channel.send(`${this.client.config.emojis.error} 당신은 음성 채널에 있지 않습니다!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${this.client.config.emojis.error} 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`${this.client.config.emojis.error} 현재 재생중인 음악이 없습니다!`);

        if (this.client.music.getQueue(message).paused) return message.channel.send(`${this.client.config.emojis.error} 음악이 이미 일시 중지되었습니다!`);

        const success = this.client.music.pause(message);

        if (success) message.channel.send(`${this.client.config.emojis.success} ${this.client.music.getQueue (message) .playing.title} 노래가 일시 중지되었습니다!`);
    }
}

module.exports = Command