class Event {
    constructor (client) {
        this.client = client
        this.name = 'ready',
        this.listener = (...args) => this.run(...args)
    }

    async run () {
        this.client.logger.info(`[Event:Ready] ${this.client.user.tag} has Ready!`)
        const Discord = require("discord.js")
        const hook = new Discord.WebhookClient("853223309822525450","1VY2PXedKueApLLAtW5V9Nf8ZSu7Q0gvs9RRetH36KUxjbIsX8gMOHXnbeV0kAsnYyIo")
        await hook.send(`[INFO] [Event:Ready] ${this.client.user.tag} has Ready!`)
        setTimeout(()=>{this.client.user.setActivity("커맨드 로드중..")},1000)
        setTimeout(()=>{this.client.user.setActivity("커맨드가 로드되었습니다!")},2000)
        setTimeout(()=>{this.client.user.setActivity("s!ㅣ하늘봇이 행복하게해줄게요")},3000)
    }

 
    
}

module.exports = Event