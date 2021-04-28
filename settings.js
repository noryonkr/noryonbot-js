module.exports = {
    token: '',
    audio: {
        nodes: [
            { host: 'localhost', port: 2333, auth: 'youshallnotpass', name: 'Container-1' }
        ],
        shoukakuOptions: { restTimeout: 10000, reconnectTries: 10, noReplace: false }
    }
}
