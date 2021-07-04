const { MessageEmbed } = require("discord.js")
const { inspect } = require('util')

const KEYBOARD_EMOJI = ':keyboard:'
const DESKTOP_EMOJI = ':desktop:'

class Command {
    constructor (client) {
        this.client = client
        this.name = 'eval'
        this.aliases = ['실행','cmd']
        this.category = 'owner'
        this.permissions = ['owner']
        this.usage = 's!eval <Text>'
        this.description = 'node.js를 실행합니다'
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

        const input = args.join(' ')
        if(input.length < 1) return message.reply('Text를 적어주세요!')

        // Actual Eval
        try {
            const evaluated = eval(input)
            const result = inspect(evaluated, { depth: 0 })

            const embed = new MessageEmbed()
                .setTitle("실행 완료")
                .setDescription(`${KEYBOARD_EMOJI}Input\`\`\`md\n${input}\n\`\`\`\n${DESKTOP_EMOJI}Output\`\`\`js\n${result}\n\`\`\``)
                
                .setColor(this.client.config.color)
                .setFooter("저작권 소유: 놀욘#0132 comjun04#0001", this.client.user.displayAvatarURL())
            message.channel.send(embed)
        } catch (e) {
            console.error(e)
            this.client.channels.cache.get('853231576141529108').send('[ERROR] '+e)
            const embed = new MessageEmbed()
                .setTitle('에러')
                .setDescription(`${KEYBOARD_EMOJI}Input\`\`\`md\n${input}\n\`\`\`\n${DESKTOP_EMOJI}Output\`\`\`js\n${e.message}\n\`\`\``)
                .setColor('RED')
                .setFooter("저작권 소유: 놀욘#0132 comjun04#0001", this.client.user.displayAvatarURL())
            return message.channel.send(embed)
        }
    }
}



module.exports = Command