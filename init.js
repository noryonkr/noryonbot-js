new (require('./index.js'))(require('./settings.js')).init()

process.on('uncaughtException', (error) => console.error(error))
process.on('unhandledRejection', (reason, promise) => console.error(reason))