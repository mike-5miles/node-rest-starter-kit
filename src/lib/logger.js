import winston from 'winston'

import config from '../../config'

const appLogger = new (winston.Logger)(config.appLogger)

module.exports = { appLogger }
