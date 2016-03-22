var express = require('express')
var router = express.Router()

var AuthController = require('../controllers/auth')

/*
 * Routes that can be accessed by any one
 */
router.post('/login', AuthController.login)

module.exports = router
