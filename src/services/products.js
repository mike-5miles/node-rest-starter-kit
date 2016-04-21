import { products as Product } from '../../db/models'

module.exports = {
  getAll: function () {
    return (async function () {
      return await Product.findAll()
    })()
  },

  getSingle: function (id) {
    return (async function () {
      return await Product.findById(id)
    })()
  },

  create: function (product) {
    return (async function () {
      return await Product.create(product)
    })()
  },

  update: function (id, product) {
    return (async function () {
      const oldProduct = await Product.findById(id)
      if (oldProduct != null) {
        return await oldProduct.update(product)
      }
      return null
    })()
  },

  delete: function (id) {
    return (async function () {
      const rows = await Product.destroy({where: {id: id}})
      return { rowsAffected: rows || 0 }
    })()
  },

  cancel: function (id) {
    // an error function
    return (async function () {
      throw new Error('My testing error')
    })()
  }
}
