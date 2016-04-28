import _ from 'underscore'
import utils from './utils'
import config from '../../config'

const AppError = function (errType, args) {
  if (config.env === 'development') {
    Error.captureStackTrace(this, this.constructor)
  }
  this.code = errType.code
  this.name = this.constructor.name
  if (!_.isEmpty(args)) {
    const marker = utils.generateTemplateString(errType.message)
    this.message = marker(args)
  } else {
    this.message = errType.message
  }
}
require('util').inherits(AppError, Error)

const create = (code, message) => { return { code, message } }
AppError.Type = {
  CHECK_FAILED: create('CHECK_FAILED', 'My testing'),

  INVALID_USER: create('INVALID_USER', 'Invalid user'),

  FEATURED_PLAN_NOT_PENDING: create('FEATURED_PLAN_NOT_PENDING',
    'Your featured has some problems, please check in 5miles'),
  FEATURED_LISTING_CHECK_FAILED: create('FEATURED_LISTING_CHECK_FAILED',
    'Your listing has some problems, please check in 5miles'),
  FEATURED_CITY_CHECK_FAILED: create('FEATURED_CITY_CHECK_FAILED',
    'The ${begin_time} to ${end_time} of ${city} has been purchased when you take action, please check')
}

module.exports = AppError
