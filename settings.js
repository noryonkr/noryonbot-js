module.exports = {
    token: '토큰',
    audio: {
        nodes: [
            { host: 'IP or host', port: 5000, auth: 'youshallnotpass', name: 'Container-1' }
        ],
        shoukakuOptions: { moveOnDisconnect: false, restTimeout: 10000, reconnectTries: 10 }
    }
}