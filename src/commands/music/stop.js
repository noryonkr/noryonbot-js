const { MessageEmbed } = require("discord.js")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'stop'
        this.aliases = ["st","정지"]
        this.category = 'music'
        this.permissions = ['Everyone']
        this.usage = '없습니다.'
        this.description = '음악을 중지합니다'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client }) {
               if (!message.member.voice.channel) return message.channel.send(`⚠ 당신은 음성 채널에 있지 않습니다!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`⚠ 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`${this.client.config.emojis.error} 현재 재생중인 음악이 없습니다!`);

        this.client.music.setRepeatMode(message, false);
        const success = this.client.music.stop(message);

        if (success) message.channel.send(`✅ 음악을**정지** 했습니다!`);
    }
}

module.exports = Command