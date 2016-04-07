import express from 'express'
const router = express.Router()

import AuthController from '../controllers/auth'

/*
 * Routes that can be accessed by any one
 */
router.post('/login', AuthController.login)

module.exports = router
