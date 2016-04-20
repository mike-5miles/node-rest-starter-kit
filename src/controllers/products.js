import { products as Product } from '../../db/models'

class ProductsController {
  registerRoutes (router) {
    router.get('/', this.getAll.bind(this))
    router.get('/:id', this.getSingle.bind(this))
    router.post('/', this.create.bind(this))
    router.put('/:id', this.update.bind(this))
    router.delete('/:id', this.delete.bind(this))
    router.post('/:id/cancel', this.cancel.bind(this))
  }

  getAll (req, res) {
    const asyncFunc = async function () {
      const allProducts = await Product.findAll()
      res.status(200).json(allProducts || [])
    }
    return asyncFunc()
  }

  getSingle (req, res) {
    const id = req.params.id
    return (async function () {
      const product = await Product.findById(id)
      res.status(200).json(product || {})
    })()
  }

  create (req, res) {
    const args = req.body
    return (async function () {
      const newProduct = await Product.create(args)
      res.status(201).json(newProduct || {})
    })()
  }

  update (req, res) {
    const args = req.body
    const id = req.params.id
    return (async function () {
      const product = await Product.findById(id)
      let updatedProduct
      if (product != null) {
        updatedProduct = await product.update(args)
      }
      res.status(200).json(updatedProduct || {})
    })()
  }

  delete (req, res) {
    const id = req.params.id
    return (async function () {
      const rows = await Product.destroy({where: {id: id}})
      res.status(200).json({rows: rows || 0})
    })()
  }

  cancel (req, res) {
    return (async function () {
      res.status(200).json({rows: 0 || 0})
    })()
  }
}

module.exports = new ProductsController()
