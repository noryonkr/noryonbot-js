class Command {
    constructor (client) {
        this.client = client
        this.name = 'test'
        this.aliases = []
        this.category = 'TEST'
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