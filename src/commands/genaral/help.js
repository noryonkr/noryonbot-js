const Discord = require('discord.js');
class Command {
    constructor (client) {
        this.client = client
        this.name = 'help'
        this.aliases = ['도움','도움말']
        this.category = 'genaral'
        this.permissions = ['Everyone']
        this.usage = ''
        this.description = '지금 보고있는게 도움말입니다'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }
    }

    async run ({ message, args, client}) {


console.log(message)
        const page1 = new Discord.MessageEmbed()
        .setTitle('[ 하늘봇 도움말 ]')
        .addField(`🔐 개발자`,[
          `s!eval - \`nodejs를 실행합니다\``,
          `s!모든공지 (모지) - \`모든서버에 공지를 보냅니다\``,
          `s!공식공지 (식공) - \`공식 서버에 공지를 보냅니다\``
        ])
        
        .addField(`🟦 기본`,[
            `s!help(도움, 도움말) - \`이 명령어입니다\``,
            `s!ping(핑) - \`봇의 핑력을 확인합니다\``,
            `s!uptime(업타임) - \`봇이 실행된 시간을 알려줘요\``,
            `s!invite(초대) - \`저를 초대해주세요\``,
            `s!서포트서버(support-server) - \`서포트 서버들 목록\``
        ])

        .addField(`🛠 관리자`,[
          `s!clear(청소, 지우기) - \`메시지를 제거합니다\``
        ])
        
        .addField('🔎 정보',[
          `s!서버정보(serverinfo, serinfo) - \`서버정보를 표시합니다\``,
          `s!프로필(pr) - \`프로필을 봅니다\``
        ])
        
        .addField('🎶 음악', [
          `s!재생(play,p) - \`음악을 재생\``,
          `s!검색(search,sc) - \`음악을 검색하고 재생\``,
          `s!스킵(skip,s) - \`음악 스킵\``,
          `s!정지(stop, st) - \`음악을 정지\``,
          `s!볼륨(volume, vol, v) - \`볼륨 조절\``,
          `s!np(now,nowplaying) - \`재생중인 곡\``,
          `s!필터(filter,ft) - \`음악에 효과를 넣습니다\``,
          `s!필터보기(filters,view-filter,필보) - \`필터가 활성화 또는 비활성화 목록을 봅니다\``,
          `s!반복(repeat,loop) - \`음악 반복모드를 변경\``,
          `s!queue(재생목록,q) - \`재생목록을 봅니다\``,
          `s!썪기(shuffle, sf) - \`재생목록에있는 노래들을 썪어요\``,
          `s!재생목록초기화(재초, queue-clear) - \`재생목록 초기화\``,
          `s!일시정지(pause,pu) - \`음악을 일시정지합니다.\``,
          `s!재개(resume, rs) - \`일시중지된 음악을 재개합니다\``
        ])
        .setThumbnail(this.client.user.displayAvatarURL())
        .setColor('#63aaf7')
        .setTimestamp()
        message.channel.send(page1)

    }
}

module.exports = Command