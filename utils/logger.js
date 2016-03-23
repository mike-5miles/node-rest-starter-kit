var winston = require('winston')
var expressWinston = require('express-winston')

var config = require('../config/config.json')
var env = process.env.NODE_ENV || config.env || 'development'

// default app logger
var appLogger = new (winston.Logger)({
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
})
if (env === 'development') {
  appLogger.add(
    winston.transports.Console,
    {
      json: false,
      colorize: 'all',
      timestamp: true
    }
  )
}

// request|response logger
var winstonInstance = new (winston.Logger)({
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
})
if (env === 'development') {
  winstonInstance.add(
    winston.transports.Console,
    {
      json: false,
      colorize: 'all',
      timestamp: true
    }
  )
}

expressWinston.bodyWhitelist.push('name')
var requestLogger = expressWinston.logger({
  winstonInstance: winstonInstance,
  requestWhitelist: ['body'],
  responseWhitelist: ['body'],
  bodyWhitelist: ['name'],
  statusLevels: true,
  colorStatus: true,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}'
})

module.exports = { app: appLogger, request: requestLogger }
