const Discord = require('discord.js')
const path = require('path')
const utils = require('./src/utils')

class Client extends Discord.Client {
  constructor (options) {
    super({ ws: { intents: Discord.Intents.ALL } })
    this.options = options
    this.globAsync = require('util').promisify(require('glob'))
    this.commands = new Discord.Collection()
    this.aliases = new Discord.Collection()
    this.events = new Discord.Collection()
    this.logger = new utils.Logger(this)
    this.audio = new utils.Audio(this)
  }

  async init () {
    await this.loadEvents()
    await this.loadCommands()
    await this.login(this.options.token)
  }

  async loadEvents (reload = false) {
    const reloadOrLoad = reload ? 'Reload' : 'Load'
    this.logger.debug(`[Events:${reloadOrLoad}] ${reloadOrLoad}ing Events...`)
    const loadedEvents = await this.globAsync(path.join(process.cwd(), 'src/events/**/*.js'))
    this.logger.info(`[Events:${reloadOrLoad}] ${reloadOrLoad}ed Events: ${loadedEvents.length}`)
    for (const file of loadedEvents) {
        const Event = new (require(file))(this)
        if (reload) {
          const { listener } = this.events.get(Event.name)
          if (listener) {
            this.removeListener(Event.name, listener)
            this.logger.warn(`[Events:${reloadOrLoad}] Removed Event Listener to ${Event.name}`)
            this.events.delete(Event.name)
          }
        }
        delete require.cache[require.resolve(file)]
        this.logger.debug(`[Events:${reloadOrLoad}] Added Event Listener to ${Event.name}`)
        this.on(Event.name, Event.listener)
        this.events.set(Event.name, Event)
    }
    this.logger.info(`[Events:${reloadOrLoad}] Successfully Events Registered and ${reloadOrLoad}ed!`)
    // return this.events
  }

  async loadCommands (reload = false) {
    const reloadOrLoad = reload ? 'Reload' : 'Load'
    this.logger.debug(`[Commands:${reloadOrLoad}] ${reloadOrLoad}ing Commands...`)
    const loadedCommands = await this.globAsync(path.join(process.cwd(), 'src/commands/**/*.js'))
    this.logger.info(`[Commands:${reloadOrLoad}] ${reloadOrLoad}ed Commands: ${loadedCommands.length}`)
    // for (const file of loadedCommands) {
    //     const Command = new (require(file))(this)
    //     this.logger.debug(`[Commands:${reloadOrLoad}] ${reloadOrLoad}ing Command: ${Command.name}`)
    //     this.logger.debug(`[Commands:${reloadOrLoad}] Added Aliases (${Command.aliases.length}) to ${Command.name}`)
    //     for (const aliases of Command.aliases) this.aliases.set(aliases, Command.name)
    //     this.commands.set(Command.name, Command)
    //     delete require.cache[require.resolve(file)]
    // }
    for (const file of loadedCommands) {
        const Command = new (require(file))(this)
        console.log(Command)
        // this.logger.debug(`[Commands:${reloadOrLoad}] ${reloadOrLoad}ing Command: ${Command.name}`)
        // this.logger.debug(`[Commands:${reloadOrLoad}] Added Aliases (${Command.aliases.length}) to ${Command.name}`)
        // for (const aliases of Command.aliases) this.aliases.set(aliases, Command.name)
        // this.commands.set(Command.name, Command)
        // delete require.cache[require.resolve(file)]
    }
    this.logger.info(`[Commands:${reloadOrLoad}] Successfully Command ${reloadOrLoad}ed!`)
    // return this.commands
  }
}

new Client(require('./config.json')).init()

process.on('uncaughtException', (error) => console.error(error))
process.on('unhandledRejection', (reason, promise) => console.error(reason))