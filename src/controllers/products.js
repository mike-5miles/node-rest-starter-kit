import { products as Product } from '../../db/models'

module.exports = {

  getAll: function (req, res) {
    const asyncFunc = async function () {
      const allProducts = await Product.findAll()
      res.status(200).json(allProducts || [])
    }
    return asyncFunc()
  },

  getOne: function (req, res) {
    const id = req.params.id
    return (async function () {
      const product = await Product.findById(id)
      res.status(200).json(product || {})
    })()
  },

  create: function (req, res) {
    const args = req.body
    return (async function () {
      const newProduct = await Product.create(args)
      res.status(201).json(newProduct || {})
    })()
  },

  update: function (req, res) {
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
  },

  delete: function (req, res) {
    const id = req.params.id
    return (async function () {
      const rows = await Product.destroy({where: {id: id}})
      res.status(200).json({rows: rows || 0})
    })()
  }

}
