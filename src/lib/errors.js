import config from '../../config'

const AppError = function (errType) {
  if (config.env === 'development') {
    Error.captureStackTrace(this, this.constructor)
  }
  this.code = errType.code
  this.name = this.constructor.name
  this.message = errType.message
}
require('util').inherits(AppError, Error)

const create = (code, message) => { return { code, message } }
AppError.Type = {
  CHECK_FAILED: create('CHECK_FAILED', 'My testing')
}

module.exports = AppError
