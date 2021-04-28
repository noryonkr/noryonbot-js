const Event = require('events')

class Queue extends Event {
    constructor (audio) {
        super()
        this.client = audio.client
        this.audio = audio
    }

    handleEvent (data) {
        
    }
}
  
  module.exports = Queue