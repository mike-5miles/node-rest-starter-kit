import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import swaggerTools from 'swagger-tools'
import swaggerDoc from '../config/swagger.json'

import config from '../config/config.json'
import logger from './utils/logger'
import routes from './routes'

const appLogger = logger.app
const requestLogger = logger.request

const app = express()
app.use(bodyParser.json())
app.use(cors())

// request|response logging
app.use(requestLogger)

// router
app.use('/', routes)

// error handler
app.use(function (err, req, res, next) {
  appLogger.error(err)
  const statusCode = err.status || 500
  res.status(statusCode).send({error: err.message})
})

// // Swagger Docs

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata())

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi())

  // Start the server
  const port = process.env.PORT || config.server_port || 3000
  app.listen(port, function () {
    appLogger.info('Server listening on port ' + port)
  })
})

module.exports = app
