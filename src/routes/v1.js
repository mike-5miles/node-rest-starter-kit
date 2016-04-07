import Router from 'express-promise-router'
const router = Router()

import ProductsController from '../controllers/products'

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/products', ProductsController.getAll)
router.get('/product/:id', ProductsController.getOne)
router.post('/products/', ProductsController.create)
router.put('/product/:id', ProductsController.update)
router.delete('/product/:id', ProductsController.delete)

module.exports = router
