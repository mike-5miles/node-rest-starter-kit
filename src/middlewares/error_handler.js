import _debug from 'debug'

import { appLogger } from '../lib/logger'
import AppError from '../lib/errors'

const debug = _debug('app:middlewares:error_handler')

const isAppError = (err) => { return err instanceof AppError }
const getError = function (err) {
  try {
    // swagger validator error
    if (err.results) {
      err = err.results.errors[0]
    }
  } catch (e) {
    err = e
  }
  return {
    error: {
      code: `${err.name || 'Error'}: ${err.code || 'UNKNOWN_CODE'}`,
      message: err.message || ''
    }
  }
}

module.exports = function (err, req, res, next) {
  debug(err)
  // log exception
  if (!isAppError(err)) {
    appLogger.error(err)
  }
  if (res.statusCode >= 400) {
    // somebody has already set res.statusCode prior to flag an error
    res.json(getError(err))
  } else {
    res.status(500).json(getError(err))
  }
}
