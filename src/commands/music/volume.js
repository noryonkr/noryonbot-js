class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'volume'
        this.aliases = ["볼륨","v","vol"]
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

        if (!args[0]||isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`현 볼륨: ${this.client.music.getQueue(message).volume}%.\n> 이상한 글자를 적지마세요 `);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`⚠ 유효한 숫자 (1에서 100 사이)를 입력하십시오!`);

        const success = this.client.music.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`✅ 볼륨이 **${parseInt(args[0])}%**로 설정되었습니다!`);
    }
}

module.exports = Command