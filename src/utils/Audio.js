const { Collection } = require('discord.js')
const Erela = require('erela.js')
const {Manager} = require('erela.js')
const Queue = require('./Queue')
const AudioUtils = require('./AudioUtils')

class Audio extends Erela {
  constructor (...args) {
      super(...args)
      this.client = args.shift()
      this.utils = new AudioUtils(this.client)
      this.client.music = new Manager({
  // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
  nodes: [{host: "noryon21.kro.kr",
      port: 5000,
      password: "youshallnotpass",},],
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
  })
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();
  });
}
}
module.exports = Audio