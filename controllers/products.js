var model = require('../models')
var co = require('bluebird').coroutine

var products = {

  getAll: function (req, res) {
    return co(function * () {
      var allProducts = yield model.products.findAll()
      res.status(200).json(allProducts || [])
    })()
  },

  getOne: function (req, res) {
    var id = req.params.id
    return co(function * () {
      var product = yield model.products.findById(id)
      res.status(200).json(product || {})
    })()
  },

  create: function (req, res) {
    var args = req.body
    return co(function * () {
      var newProduct = yield model.products.create(args)
      res.status(201).json(newProduct || {})
    })()
  },

  update: function (req, res) {
    var args = req.body
    var id = req.params.id
    return co(function * () {
      var product = yield model.products.findById(id)
      var updatedProduct
      if (product != null) {
        updatedProduct = yield product.update(args)
      }
      res.status(200).json(updatedProduct || {})
    })()
  },

  delete: function (req, res) {
    var id = req.params.id
    return co(function * () {
      var rows = yield model.products.destroy({where: {id: id}})
      res.status(200).json({rows: rows || 0})
    })()
  }
}

module.exports = products
