import Router from 'express-promise-router'
import Controller from './controllers'

const router = Router()

const apiRouter = Router()
router.use('/api/v1', apiRouter)

const productsApiV1 = Router()
apiRouter.use('/products', productsApiV1)
Controller.ProductsController.registerRoutes(productsApiV1)

module.exports = router
