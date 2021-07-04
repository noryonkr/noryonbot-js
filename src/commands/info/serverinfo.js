const { MessageEmbed } = require("discord.js")
const { cli } = require("winston/lib/winston/config")

class Command {
    constructor (client) {
        
        this.client = client
        this.name = '서버정보'
        this.aliases = ["serverinfo","serinfo"]
        this.category = 'info'
        this.permissions = ['Everyone']
        this.usage = '없습니다.'
        this.description = '서버정보를 확인해요.'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client }) {
      const moment = require("moment")
        const embed = new MessageEmbed()
        .setColor('#63aaf7')
        .setTimestamp()
        .setTitle(`${message.guild.name}의 서버정보!`)
        .setDescription(`
        서버 ID: ${message.guild.id}
        
        서버 주인: ${message.guild.owner}
        
        서버 멤버: ${message.guild.members.cache.size}명
        
        서버 채널: ${message.guild.channels.cache.size}개
        
        서버 역할: ${message.guild.roles.cache.size}개

        서버 이모지: ${message.guild.emojis.cache.size}개

        서버 지역: ${message.guild.region}
        
        부스트 레벨: Lv. ${message.guild.premiumTier}
           ㄴ 부스트 횟수: ${message.guild.premiumSubscriptionCount || '부스트가 된적이없습니다'}
          
        서버가 생성된 날짜: ${moment(message.guild.createdAt).format("YYYY년 MM월 DD일 HH시 mm분 ss초")}`)
        .setThumbnail(message.guild.iconURL({size:1024, dynamic: true, format: 'webp'??'png'??'gif'}))
        message.channel.send(embed)
        
    }
}

module.exports = Command