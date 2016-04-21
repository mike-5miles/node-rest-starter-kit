import _ from 'underscore'
import CRUD from '../lookups/crud'

module.exports = function (req, res, next) {
  res.Status404 = function () {
    this.status(404).json({ error: 'Not Found' })
  }
  res.Status204 = function () {
    this.status(204).send()
  }

  /*
    create: return 201 with the new object
    update: return 204 if success, 404 if not found
    delete: return 204 if success, 404 if not found
    read: return 200 with object(s) found if success, 404 if not found
    all: return 500 with error message if exception
  */
  res.jsonSuccess = function (op, data) {
    if (_.isObject(data) && _.isEmpty(data) ||
        _.isUndefined(data) || _.isNull(data) ||
        (data.rowsAffected === 0)) {
      // 404 for update|delete|read, if not found
      if (op === CRUD.create) {
        throw new Error('Create resource shouldn\'t return nothing')
      }
      this.Status404()
    } else if (op === CRUD.update || op === CRUD.delete) {
      // 204 for update|delete
      this.Status204()
    } else if (op === CRUD.create) {
      // 201 for create
      this.status(201).json(data)
    } else if (!_.isEmpty(data)) {
      // 200 for read if found
      this.status(200).json(data)
    } else {
      // don't know why we're here
      throw new Error('Unknown Error')
    }
  }

  next()
}
