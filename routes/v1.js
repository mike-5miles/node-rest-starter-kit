var router = require('express-promise-router')()
var ProductsController = require('../controllers/products')

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/products', ProductsController.getAll)
router.get('/product/:id', ProductsController.getOne)
router.post('/products/', ProductsController.create)
router.put('/product/:id', ProductsController.update)
router.delete('/product/:id', ProductsController.delete)

module.exports = router
