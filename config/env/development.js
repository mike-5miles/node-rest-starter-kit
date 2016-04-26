import winston from 'winston'

let config = require('./_base')

config.env = 'development'

config.appLogger.transports.push(
  new (winston.transports.Console)({
    json: false,
    colorize: 'all',
    timestamp: true
  })
)
config.requestLogger.transports.push(
  new (winston.transports.Console)({
    json: false,
    colorize: 'all',
    timestamp: true
  })
)

module.exports = config
