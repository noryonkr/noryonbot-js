class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'search'
        this.aliases = ["sc","검색"]
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

        if (!args[0]) return message.channel.send(`${this.client.config.emojis.error} 노래 제목을 알려주세요!`);

        this.client.music.play(message, args.join(" "));
    }
}

module.exports = Command