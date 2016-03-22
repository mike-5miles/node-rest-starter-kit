var express = require('express')
var router = express.Router()

var auth = require('../controllers/auth.js')

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login)

module.exports = router
