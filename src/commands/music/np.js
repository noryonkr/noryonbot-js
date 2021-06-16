class Command {
    constructor (client) {
        
        this.client = client
        this.name = 'np'
        this.aliases = ["now","nowplaying"]
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
if (!message.member.voice.channel) return message.channel.send(`음성 채팅방에 참여해주세요`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`같은 음성에 있지않아요`);

        if (!this.client.music.getQueue(message)) return message.channel.send(`음악을 재생하고있지않습니다`);

        const track = this.client.music.nowPlaying(message);
        const filters = [];

        Object.keys(this.client.music.getQueue(message).filters).forEach((filterName) => this.client.music.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send({
            embed: {
                color: this.client.config.color,
                author: { name: track.title },
                fields: [
                    { name: '📺채널', value: track.author, inline: true },
                    { name: '🎤신청한 사람', value: track.requestedBy.username, inline: true },
                    { name: '🧾플레이리스트', value: track.fromPlaylist ? '플레이리스트로 신청' : '플레이리스트로 신청이 아님', inline: true },

                    { name: '️️️👩조회수', value: track.views, inline: true },
                    { name: '✏설명', value: track.duration, inline: true },
                    { name: '🎛활성화 된 필터', value: filters.length + '/' + this.client.filter.length, inline: true },

                    { name: '🔉볼륨', value: this.client.music.getQueue(message).volume, inline: true },
                    { name: '🔁반복 모드', value: this.client.music.getQueue(message).repeatMode ? '켜짐' : '꺼짐', inline: true },
                    { name: '▶현재 일시 중지', value: this.client.music.getQueue(message).paused ? '켜짐' : '꺼짐', inline: true },

                    { name: '⏳ 진행 표시 줄 ⏳', value: this.client.music.createProgressBar(message, { timecodes: true }), inline: true }
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    }
}

module.exports = Command