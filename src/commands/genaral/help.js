class Command {
    constructors (client) {
        this.client = client
        this.name = 'help',
        this.aliases = ['도움말'],
        this.category = ''
        this.permissions = ['Everyone'],
        this.usage = ''
        this.description = '현재 도움말임'
    }

    async run () {}
}

module.exports = Command