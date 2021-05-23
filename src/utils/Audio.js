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
  }

  async join (guildID, voiceChannelID) {
    const node = await this.getNode()
    try {
      await node.joinVoiceChannel({ guildID, voiceChannelID })
      await this.this.setPlayerDefaultSetting(guildID)
      this.client.logger.info(`[Audio:Join] [${guildID}, ${voiceChannelId}] Successfully joined voiceChannel.`)
    } catch (e) {
      this.client.logger.error(`[Audio:Join] [${guildID}, ${voiceChannelID}] Failed to join voiceChannel.\n${e}`)
    }
  }

  async setPlayerDefaultSetting (guildId) {
    if (!guildID) return new Error('guildId is not provided!')
    const { volume } = await this.client.database.getGuild(guildId)
    this.client.logger.debug(`[Audio:SetPlayerDefaultSetting] Set player volume for guild via guildId: ${guildId} (${volume}%)`)
    return this.players.get(guildId).setVolume(volume)
  }

  _setupPlayerEvents (player) {
    player.on('error', (error) => {
      this.client.logger.error(`[Player:Event:Error] Error on player ${error.stack || error.message}`)
      player.disconnect()
    })
    player.on('end', (reason) => {
      this.client.logger.debug(`[Player:Event:End] [${player.guildID}, ${player.voiceChannelID}] Track Ended, emitted events`)
      this.queue.playNext(guildId)
    })
    player.on('trackException', (data) => {
      this.client.logger.debug(`[Player:Event:TrackException] [${player.guildID}, ${player.voiceChannelID}] is Track(${data.track}) Exception.`)
      
    })
  }
}

module.exports = Audio