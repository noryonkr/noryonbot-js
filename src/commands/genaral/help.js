class Command {
    constructor (client) {
        this.client = client
        this.name = 'help'
        this.aliases = ['도움','도움말']
        this.category = 'genaral'
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

    async run ({ message, client, command}) {
   message.channel.send('[알림] 현재 도움말이없어요 ㅜ.ㅜ')
    }
}

module.exports = Command