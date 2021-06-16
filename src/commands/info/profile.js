const { MessageEmbed } = require("discord.js")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = '프로필'
        this.aliases = ["pr"]
        this.category = 'info'
        this.permissions = ['Everyone']
        this.usage = '없습니다.'
        this.description = '프로필를 확인해요.'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client }) {
       const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
               const no = new MessageEmbed()
        .setColor('#63aaf7')
        .setTitle(`${message.author.tag}의 프로필!`)
        .setImage(message.author.displayAvatarURL({size:1024, dynamic: true, format: 'webp'??'png'??'gif'}))
       if(!user) message.channel.send(no)
        const embed = new MessageEmbed()
        .setTimestamp()
        .setColor('#63aaf7')
        .setTitle(`${user.tag}의 프로필!`)
        .setImage(user.displayAvatarURL({size:1024, dynamic: true, format: 'webp'??'png'??'gif'}))
        message.channel.send(embed)
        
    }
}

module.exports = Command