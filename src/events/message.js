
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
      const Discord = require("discord.js")
const hook = new Discord.WebhookClient("853565446497894420","oHqLunniedEKEUKQABNhHtJb6VB9NkeeknRXbAFagtyrxG5-FgJFw9n8Z8aYLjg1ZbBV")

      if (message.author.bot || message.system) return
      const prefix = this.client.config.prefix
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase()
      const commandClass = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
      if (message.content.startsWith(prefix)) {
        if (message.channel.type === 'dm') return message.channel.send("이곳에서는 명령어를 사용할 수 없습니다!")
        try {
            await commandClass.run({ message, args, prefix })
            this.client.logger.debug(`[Command:${commandClass.name}]${message.guild.name}: ${message.author.tag} Use command`)
            this.client.channels.cache.get('853222774218817586').send(`**\`[DEBUG]\` [Command:${commandClass.name}]** ${message.guild.name}: ${message.author.tag} Use command`)
        } catch (e) {
console.log(e)
hook.send(`**[ERROR : ${commandClass.name}]** `+e)
        }
      }
    }
}

module.exports = Event

