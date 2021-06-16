class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'skip'
        this.aliases = ["스킵","s"]
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
            if (!message.member.voice.channel) return message.channel.send(`⚠ 당신은 음성 채널에 있지 않습니다!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`⚠ 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`⚠ 현재 재생중인 음악이 없습니다!`);

        const success = this.client.music.skip(message);

        if (success) message.channel.send(`⚠ 현재 음악이 ** 건너 뛰었습니다 **!`);
    }
}

module.exports = Command