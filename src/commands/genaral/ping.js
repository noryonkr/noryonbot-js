class Command {
    constructors (client) {
        this.client = client
        this.name = 'ping',
        this.aliases = ['핑'],
        this.category = ''
        this.permissions = ['Everyone'],
        this.usage = ''
        this.description = ''
    }

    async run () {}
}
  
module.exports = Command