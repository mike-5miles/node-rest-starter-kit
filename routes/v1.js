var router = require('express-promise-router')()

var products = require('../controllers/products.js')

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/products', products.getAll)
router.get('/product/:id', products.getOne)
router.post('/products/', products.create)
router.put('/product/:id', products.update)
router.delete('/product/:id', products.delete)

module.exports = router
