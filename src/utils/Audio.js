const { Collection } = require('discord.js')
const Shoukaku = require('shoukaku')
const Queue = require('./Queue')
const AudioUtils = require('./AudioUtils')

class Audio extends Shoukaku.Shoukaku {
  constructor (...args) {
      super(...args)
      this.client = args.shift()
      this.utils = new AudioUtils(this.client)
      // this.players = new Collection()
      this.queue = new Queue(this)
      this.queue.on('queueEvent', data => this.queue.handleEvent(data))
      this.on('ready', (name, resumed) => this.client.logger.info(`[Audio:Lavalink] Lavalink Node: ${name} is now connected. This connection is ${resumed ? 'resumed' : 'a new connection'}`))
      this.on('error', (name, error) => this.client.logger.error(`[Audio:Lavalink] Lavalink Node: ${name} emitted an error. ${error.stack}`))
      this.on('close', (name, code, reason) => this.client.logger.warn(`[Audio:Lavalink] Lavalink Node: ${name} closed with code ${code}. Reason: ${reason || 'No reason'}`))
      this.on('disconnected', (name, reason) => this.client.logger.warn(`[Audio:Lavalink] Lavalink Node: ${name} disconnected. Reason: ${reason || 'No reason'}`))
      this.on('debug', (name, data) => this.client.logger.debug(`[Audio:Lavalink] Lavalink Node: ${name} - Data: ${JSON.stringify(data)}`))
      console.log(this.nodes)
  }

  join (guildId, vchId) {

  }
}

module.exports = Audio