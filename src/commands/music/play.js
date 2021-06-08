

class Command {
    constructor (client) {
        this.client = client
        this.name = 'play'
        this.aliases = ['재생','플레이']
        this.category = 'music'
        this.permissions = ['Everyone']
        this.usage = 's!play <URL|Text>'
        this.description = '음악을 재생합니다'
        this.requirements = {
            allowDM: false,
            inVoice: true,
            sameVC: true,
            sameTC: false,
            isPlaying: true
        }

    }

    async run ({ message, client}) {
     
    }
}

module.exports = Command