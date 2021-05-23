class Command {
    constructor (client) {
        this.client = client
        this.name = 'help'
        this.aliases = ['도움','도움말']
        this.category = '기본'
        this.permissions = ['Everyone']
        this.usage = ''
        this.description = ''
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message }) {
        message.channel.send('Loaded Success to Commands')
    }
}

module.exports = Command