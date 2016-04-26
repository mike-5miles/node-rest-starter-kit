import _ from 'underscore'

// enable async/await error handler
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
module.exports = (fn) => (...args) => {
  const asyncFunc = fn(...args)
  if (!_.isUndefined(asyncFunc)) {
    asyncFunc.catch(args[2])
  }
}
