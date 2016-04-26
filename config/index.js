process.env.NODE_ENV = process.env.NODE_ENV || 'development'

// load the config file for the current environment
let config = require('./env/' + process.env.NODE_ENV)

// export config
module.exports = config
