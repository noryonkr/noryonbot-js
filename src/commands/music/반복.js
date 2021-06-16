class Command {
    constructor (client) {
        
        this.client = client
        this.name = '반복'
        this.aliases = ["repeat","loop"]
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
        if (!message.member.voice.channel) return message.channel.send(`${this.client.emojis.error} 당신은 음성 채널에 있지 않습니다!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${this.client.emojis.error} 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!client.player.getQueue(message)) return message.channel.send(`⚠ 현재 재생중인 음악이 없습니다!`);

        if (args.join(" ").toLowerCase() === 'queue') {
            if (this.client.music.getQueue(message).loopMode) {
                this.client.music.setLoopMode(message, false);
                return message.channel.send(`✅ 반복 모드 ** 비활성화 **!`);
            } else {
                thisclient.music.setLoopMode(message, true);
                return message.channel.send(`✅ 반복 모드 ** 사용 ** 전체 대기열이 끝없이 반복됩니다!`);
            };
        } else {
            if (this.client.music.getQueue(message).repeatMode) {
                this.client.music.setRepeatMode(message, false);
                return message.channel.send(`✅ 반복 모드 ** 비활성화 **!`);
            } else {
                this.client.music.setRepeatMode(message, true);
                return message.channel.send(`✅ 반복 모드 ** 사용 ** 현재 음악이 끝없이 반복됩니다!`);
            };
        };
    }
}

module.exports = Command