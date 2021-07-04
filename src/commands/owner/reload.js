const { MessageEmbed } = require("discord.js")


class Command {
    constructor (client) {
        this.client = client
        this.name = 'reload'
        this.aliases = ['리로드', 'ㄹㄹㄷ']
        this.category = 'owner'
        this.permissions = ['admin']
        this.usage = 's!reload'
        this.description = '명령어를 로드합니다'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }

    }

    async run ({ message, client, args}) {
if(!message.author.id == this.client.config.owners) return message.reply('개발자가 아니에요. \n> ⚠ Not Developer Permission')
message.channel.send("<a:win_load:714119517118267442> 명령어를 리로드중..").then(async x=> {
    await this.client.loadCommands()

x.edit(`<a:bot_yes:764069111386734613> ${this.client.commands.size}개의 명령어를 리로드 완료했습니다`)
})
    }
}

module.exports = Command