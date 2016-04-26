import ProductService from '../services/products'
import CRUD from '../lookups/crud'

module.exports = {
  getAll: function (req, res, next) {
    return ProductService.getAll()
      .then(function (data) {
        return res.jsonResult(CRUD.read, data || [])
      })
  },

  getSingle: function (req, res, next) {
    const id = req.swagger.params.id.value
    return ProductService.getSingle(id)
      .then(function (data) {
        return res.jsonResult(CRUD.read, data)
      })
  },

  create: function (req, res) {
    const product = req.swagger.params.product.value
    return ProductService.create(product)
      .then(function (data) {
        return res.jsonResult(CRUD.create, data)
      })
  },

  update: function (req, res) {
    const product = req.swagger.params.product.value
    const id = req.swagger.params.id.value
    return ProductService.update(id, product)
      .then(function (data) {
        return res.jsonResult(CRUD.update, data)
      })
  },

  delete: function (req, res) {
    const id = req.swagger.params.id.value
    return ProductService.delete(id)
      .then(function (data) {
        return res.jsonResult(CRUD.delete, data)
      })
  },

  valid: function (req, res) {
    const id = req.swagger.params.id.value
    return ProductService.valid(id)
      .then(function (data) {
        return res.jsonResult(CRUD.read, data)
      })
  }
}
