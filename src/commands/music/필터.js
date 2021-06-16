class Command {
    constructor (client) {
        
        this.client = client
        this.name = '필터'
        this.aliases = ["filter","ft"]
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

        if (!args[0]) return message.channel.send(`⚠ 활성화 또는 비활성화하려면 유효한 필터를 지정하십시오!`);

        const filterToUpdate = this.client.filter.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`⚠ 이 필터는 존재하지 않습니다. 예를 들어 (8D, vibrato, pulsator..)!`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = this.client.music.getQueue(message).filters[filterToUpdate] ? false : true;

        this.client.music.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`<a:loading:805414304752861194> 음악에 필터를 ** 추가 **하고 있습니다. 잠시만 기다려주세요!`);
        else message.channel.send(`<a:loading:805414304752861194> 음악의 필터를 ** 비활성화 **하고 있습니다. 잠시만 기다려주세요!`);
    }
}

module.exports = Command