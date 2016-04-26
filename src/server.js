import express from 'express'
import cors from 'cors'
import _debug from 'debug'

import swaggerTools from 'swagger-tools'
import path from 'path'
import jsyaml from 'js-yaml'
import fs from 'fs'

import config from '../config'
import expressExt from './middlewares/express_ext'
import requestLogger from './middlewares/request_logger'
import asyncWrap from './middlewares/async_wrap'
import errorHandler from './middlewares/error_handler'

const debug = _debug('app:server')
expressExt(express)
const app = express()
app.use(cors())

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.resolve(__dirname, '..', 'config/swagger.yaml'), 'utf8')
const swaggerDoc = jsyaml.safeLoad(spec)
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata())
  // Validate Swagger requests and responses
  app.use(middleware.swaggerValidator({
    validateResponse: true
  }))
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi())

  // request|response logging
  app.use(requestLogger)

  // Route validated requests to appropriate controller
  app.use(asyncWrap(middleware.swaggerRouter({
    useStubs: config.env === 'development',
    controllers: path.resolve(__dirname, 'controllers')
  })))
  // error handler
  app.use(errorHandler)

  // Start the server
  const port = config.server.port
  app.listen(port, function () {
    debug('Server listening on port ' + port)
  })
})

module.exports = app
