import { products as Product } from '../models'
import AppError from '../lib/errors'

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

  valid: function (id) {
    return (async function () {
      if (id === 1) {
        // simulate pre-defined error
        throw new AppError(AppError.Type.CHECK_FAILED)
      } else if (id === 2) {
        // success
        return { valid: true }
      } else if (id === 3) {
        // simulate bad response
        return { valid111: true }
      } else {
        // simulate unhandled exception
        throw new Error('unhandled exception')
      }
    })()
  }
}
