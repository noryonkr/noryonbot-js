class Event {
    constructor (client) {
        this.client = client
        this.name = 'ready',
        this.listener = (...args) => this.run(...args)
    }

    async run () {
        this.client.logger.info(`[Event:Ready] ${this.client.user.tag} has Ready!`)
    }
}

module.exports = Event