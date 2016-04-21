import express from 'express'
import cors from 'cors'

import swaggerTools from 'swagger-tools'
import path from 'path'
import jsyaml from 'js-yaml'
import fs from 'fs'

import config from '../config/config.json'
import logger from './middlewares/logger'
import responseExt from './middlewares/response'

const appLogger = logger.app
const requestLogger = logger.request

const app = express()
app.use(cors())

// swaggerRouter configuration
const env = process.env.NODE_ENV || config.env || 'development'
const options = {
  useStubs: env === 'development',
  controllers: path.resolve(__dirname, 'controllers')
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.resolve(__dirname, '..', 'config/swagger.yaml'), 'utf8')
var swaggerDoc = jsyaml.safeLoad(spec)
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata())
  // Validate Swagger requests
  app.use(middleware.swaggerValidator())
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi())

  // request|response logging
  app.use(requestLogger)
  // build json response
  app.use(responseExt)

  // enable async/await error handler
  const wrap = (fn) => (...args) => fn(...args).catch(args[2])
  // Route validated requests to appropriate controller
  app.use(wrap(middleware.swaggerRouter(options)))

  // error handler
  app.use(function (err, req, res, next) {
    appLogger.error(err)
    res.status(500).json({error: err.message})
  })

  // Start the server
  const port = process.env.PORT || config.server_port || 3000
  app.listen(port, function () {
    appLogger.info('Server listening on port ' + port)
  })
})

module.exports = app
