class Command {
    constructor (client) {
        
        this.client = client
        this.name = '재생목록초기화'
        this.aliases = ["재초","queue-clear"]
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
      if (!message.member.voice.channel) return message.channel.send(`${client.config.emojis.error} 당신은 음성 채널에 있지 않습니다!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${this.client.config.emojis.error} 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`${this.client.config.emojis.error} 현재 재생중인 음악이 없습니다!`);

        if (this.client.music.getQueue(message).tracks.length <= 1) return message.channel.send(`${this.client.config.emojis.error} 대기열에 노래가 하나만 있습니다.`);

        this.client.music.clearQueue(message);

        message.channel.send(`${this.client.config.emojis.success} 대기열이 방금 ** 삭제 **되었습니다!`);
    }
}
module.exports = Command