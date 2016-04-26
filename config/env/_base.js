import winston from 'winston'

let config = {}
config.env = 'development'

config.server = {
  port: 3333
}

config.appLogger = {
  transports: [
    new (winston.transports.File)({
      filename: './logs/app.log',
      level: 'info',
      timestamp: true,
      maxsize: 10000000,
      maxFiles: 10,
      json: false,
      tailable: true
    })
  ]
}

config.requestLogger = {
  transports: [
    new (winston.transports.File)({
      filename: './logs/req-res.log',
      level: 'error',
      timestamp: true,
      maxsize: 10000000,
      maxFiles: 10,
      json: true,
      tailable: true
    })
  ]
}

config.requestLogOptions = {
  requestWhitelist: ['body'],
  responseWhitelist: ['body'],
  bodyWhitelist: ['name'],
  statusLevels: true,
  colorStatus: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}'
}

module.exports = config
