class Command {
    constructors (client) {
        this.client = client
        this.name = 'serverinfo',
        this.aliases = ['서버정보'],
        this.category = ''
        this.permissions = ['Everyone'],
        this.usage = ''
        this.description = ''
    }

    async run () {}
}
  
module.exports = Command