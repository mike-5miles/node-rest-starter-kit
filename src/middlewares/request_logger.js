import winston from 'winston'
import expressWinston from 'express-winston'

import config from '../../config'

module.exports = expressWinston.logger(
  Object.assign(config.requestLogOptions, {
    winstonInstance: new (winston.Logger)(config.requestLogger)
  })
)
