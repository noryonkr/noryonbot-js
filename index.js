const { Client, Collection, Intents } = require('discord.js')
const path = require('path')
const { promisify } = require('util')
const utils = require('./src/utils')

const client = new Client()
client.on('ready', () => console.log('ready'))
// client.login(require('./settings.js').token)

class BaseClient extends Client {
  constructor (options) {
    super()
    this.options = options
    this.utils = utils
    this.commands = new Collection()
    this.aliases = new Collection()
    this.events = new Collection()
    this.logger = new utils.Logger(this)
    this.events = new Collection()
    this.commands = new Collection()
    this.aliases = new Collection()
    this.globAsync = promisify(require('glob'))
    this.wait = promisify(setTimeout)
    this.isReload = false
    this.initialized = false
    this.audio_initialized = false
    this.commands_loaded = false
    this.events_loaded = false
  }

  async init () {
      this.logger.debug(`[Init] Initializing...`)
      await this.registerEvents()
      await this.loadCommands()
      await this.login(this.options.token)
      this.initialized = true
  }

  async registerEvents (reload = false) {
    const reloadOrLoadPrefix = this.events_loaded ? '[RegisterEvents:Reload]' : '[RegisterEvents:Load]'
    const reloadOrLoadSubfix = this.events_loaded ? 'Reload' : 'Load'
    this.logger.debug(`${reloadOrLoadPrefix} ${reloadOrLoadSubfix} Events...`)
    const loadedEvents = await this.globAsync(path.join(process.cwd(), '/src/events/**/*.js'))
    this.logger.info(`${reloadOrLoadPrefix} ${reloadOrLoadSubfix}ed Events: ${loadedEvents.length}`)
    for (const file of loadedEvents) {
      const Event = new (require(file))(this)
      if (reload) {
        const { listener } = this.events.get(Event.name)
        if (listener) {
          this.removeListener(Event.name, listener)
          this.logger.warn(`${reloadOrLoadPrefix} Removed Event Listener to ${Event.name}`)
          this.events.delete(Event.name)
        }
      }
      delete require.cache[require.resolve(file)]
      this.logger.debug(`${reloadOrLoadPrefix} Added Event Listener to ${Event.name}`)
      this.on(Event.name, Event.listener)
      this.events.set(Event.name, Event)
    }
    this.logger.info(`${reloadOrLoadPrefix} Successfully Events Registered and ${reloadOrLoadSubfix}ed!`)
    this.events_loaded = true
    return this.events
  }

  async loadCommands () {
    const reloadOrLoadPrefix = this.commands_loaded ? '[LoadCommands:Reload]' : '[LoadCommands:Load]'
    const reloadOrLoadSubfix = this.commands_loaded ? 'Reload' : 'Load'
    this.logger.debug(`${reloadOrLoadPrefix} ${reloadOrLoadSubfix}ing Commands...`)
    const loadedCommands = await this.globAsync(path.join(process.cwd(), '/src/commands/**/*.js'))
    this.logger.info(`${reloadOrLoadPrefix} ${reloadOrLoadSubfix}ed Commands: ${loadedCommands.length}`)
    for (const file of loadedCommands) {
      const Command = new (require(file))(this)
      this.logger.debug(`${reloadOrLoadPrefix} ${reloadOrLoadSubfix}ing Command: ${Command.name}`)
      this.logger.debug(`${reloadOrLoadPrefix} Added Aliases (${Command.aliases.length}) to ${Command.name}`)
      for (const aliases of Command.aliases) this.aliases.set(aliases, Command.name)
      this.commands.set(Command.name, Command)
      delete require.cache[require.resolve(file)]
    }
    this.logger.info(`${reloadOrLoadPrefix} Successfully Command ${reloadOrLoadSubfix}ed!`)
    this.commands_loaded = true
    return this.commands
  }

  getInfo () {
    const mem = process.memoryUsage()
    return {
      guilds: this.guilds.cache.size,
      users: this.users.cache.size,
      players: this.audio.players.size,
      memoryUsage: `ArrayBuffers: ${this.utils.niceBytes(mem.arrayBuffers)}, External: ${this.utils.niceBytes(mem.external)}, Heaptotal: ${this.utils.niceBytes(mem.heapTotal)}, Heapused: ${this.utils.niceBytes(mem.heapUsed)}, Rss: ${this.utils.niceBytes(mem.rss)}`
    }
  }
}

module.exports = BaseClient

process.on('uncaughtException', (error) => console.error(error))
process.on('unhandledRejection', (reason, promise) => console.error(reason))