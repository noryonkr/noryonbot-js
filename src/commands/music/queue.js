class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'queue'
        this.aliases = ["q","재생목록"]
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

        const queue = this.client.music.getQueue(message);

        if (!this.client.music.getQueue(message)) return message.channel.send(`${this.client.config.emojis.error} 현재 재생중인 노래가 없습니다!`);

        message.channel.send(`**서버 재생목록 - ${message.guild.name} ${this.client.config.emojis.queue} ${this.client.music.getQueue(message).loopMode ? '(반복)' : ''}**\n재생중: ${queue.playing.title} | ${queue.playing.author}\n\n` + (queue.tracks.map((track, i) => {
            return `\`\`\`md\n${i + 1}. [${track.title} | ${track.author}](신청자 : ${track.requestedBy.username})\n\`\`\``
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `그리고 **${queue.tracks.length - 5}** 다른 노래 ...` : `재생 목록에서 **${queue.tracks.length}**개의 노래들..`}`));

    }
}

module.exports = Command