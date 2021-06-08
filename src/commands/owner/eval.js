const { MessageEmbed } = require("discord.js")


class Command {
    constructor (client) {
        this.client = client
        this.name = 'eval'
        this.aliases = ['실행']
        this.category = 'owner'
        this.permissions = ['Owner']
        this.usage = 's!eval <Text>'
        this.description = '음악을 재생합니다'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }

    }

    async run ({ message, client, args}) {
        if(message.author.id != this.client.config.owners) return message.reply('개발자가 아니에요. \n> ⚠ Not Developer Permission')
        if(!args) return message.channel.send('관리자님, Text를 적어주세요!')
  const Eval = new MessageEmbed()
  .setTitle("실행 완료")
  .setDescription('```js\n'+eval(args.join(' '))+'```')
  .setFooter(message.author.tag,message.author.displayAvatarURL())
  message.channel.send(Eval)
    }
}

module.exports = Command