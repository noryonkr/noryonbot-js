const { cpuUsage } = require("process")


class Event {
    constructor (client) {
        this.client = client
        this.name = 'message',
        this.listener = (...args) => this.run(...args)
    }

    async run (message) {
        this.handleCommand(message)
    }

    async handleCommand (message) {
      if (message.author.bot || message.system) return
      const prefix = this.client.config.prefix
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const command = args.shift().toLowerCase()
      const commandClass = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
      if (message.content.startsWith(prefix)) {
        if (message.channel.type === 'dm') return message.channel.send("이곳에서는 명령어를 사용할 수 없습니다!")
        try {
            await commandClass.run({ message, args, prefix })
        } catch (e) {

        }
      }
    }
}

module.exports = Event

