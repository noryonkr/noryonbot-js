class Command {
    constructor (client) {
        this.client = client
        this.name = 'clear'
        this.aliases = ['지우기','청소']
        this.category = 'admin'
        this.permissions = ['admin']
        this.usage = 's!clear <숫자>'
        this.description = '채널을 메시지를 청소합니다!'
        this.requirements = {
            allowDM: false,
            inVoice: false,
            sameVC: false,
            sameTC: false,
            isPlaying: false
        }

    }

    async run ({ message, client, args }) {
        const cnt = args[0]
        if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) {
            return message.reply("잠깐! 권한이없잖아요오!\n> ❌ Message Manage No Permission!")
        }
        
        if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
            return message.reply("음.. 권한이없네요\n> ❌ Message Manage No Permission!")
        }
        if (!cnt) return message.reply('지울 메시지수를 적어주세요')
        if (isNaN(cnt)) return message.reply("숫자만 적어주세요^^")
        if (args < 2) return message.reply("1 이하는 지울수없습니다")

        await message.channel.bulkDelete(cnt)
        message.channel.send(`${cnt}개의 메시지가 제거되었어요`)
    }
}
module.exports = Command