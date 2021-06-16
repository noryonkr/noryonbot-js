class Command {
    constructor (client) {
        
        this.client = client
        this.name = '필터보기'
        this.aliases = ["filters","view-filters","vf","필보"]
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

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`❌ 당신은 같은 음성 채널에 있지 않습니다!`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`❌ 현재 재생중인 음악이 없습니다!`);

        const filtersStatuses = [[], []];

        this.client.filter.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (this.client.music.getQueue(message).filters[filterName] ? this.client.config.emojis.success : this.client.config.emojis.off));
        });

        message.channel.send({
            embed: {
                color: 'ORANGE',
                fields: [
                    { name: '필터', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `활성화 또는 비활성화 된 모든 필터 목록입니다. \n \`${this.client.config.prefix}filter \`를 사용하여 노래에 필터를 추가하세요.`,
            },
        });
    }
}
module.exports = Command