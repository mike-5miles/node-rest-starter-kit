import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import config from '../config/config.json'
import logger from './utils/logger'

const appLogger = logger.app
const requestLogger = logger.request

const app = express()
app.use(bodyParser.json())

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*') // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

// request|response logging
app.use(requestLogger)

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
// app.all('/api/*', [require('./middlewares/validateRequest')])

app.use('/', require('./routes'))
app.use('/api/v1/', require('./routes/v1.js'))
app.get('/api/v1/swagger.yaml', function (req, res) {
  res.sendFile('swagger.yaml', { root: path.join(__dirname, 'config') })
})

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  res.status(404).end()
})

// error handler
app.use(function (err, req, res, next) {
  appLogger.error(err)
  const statusCode = err.status || 500
  res.status(statusCode).send({error: err.message})
})

// Start the server
const port = process.env.PORT || config.server_port || 3000
app.listen(port, function () {
  appLogger.info('Server listening on port ' + port)
})

module.exports = app
