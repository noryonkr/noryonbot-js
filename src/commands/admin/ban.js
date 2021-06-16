const { MessageEmbed } = require("discord.js")


class Command {
    constructor (client) {
        this.client = client
        this.name = 'ban'
        this.aliases = ['밴']
        this.category = 'admin'
        this.permissions = ['admin']
        this.usage = 's!ban <Text>'
        this.description = '이서버에서 밴함 ㅅㄱ!'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }

    }

    async run ({ message, client, args}) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply('관리자가 아니에요. \n> ⚠ Not Admin Permission')
  

        if(!user) return message.reply('유저를 멘션해주세요') 
        if(!args[1]) return message.channel.send('관리자님, 사유를 적어주세요!')
         
        const embed = new MessageEmbed()
        .setTitle('안녕하세요? 검거했습니다!')
        .setDescription(`관리자: ${message.author}\n밴 유저: ${user}\n사유: ${args[1].join(' ')}\n\n이 유저는 관리자의 말을 무시해서 밴을 당한걸지도..?`)
        .setColor('RED')
        .setFooter(user.username+'는 밴되었습니다', user.displayAvatarURL())
        await user.ban({reason:args[1].join})
        user.send(`**${message.guild.name}에서 다음 사유로 영구 밴이되었습니다**\n\`\`\`diff\n- 사유: ${args[1].join(' ')}\`\`\``)
        message.channel.send(embed)



}
}



module.exports = Command