class Command {
    constructor (client) {
        this.client = client
        this.name = 'uptime'
        this.aliases = ["업타임"]
        this.category = 'geranal'
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
        message.channel.send(`봇 속도는.. ${this.client.ws.ping}`)
    }
}

module.exports = Command