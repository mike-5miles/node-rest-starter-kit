import _ from 'underscore'
import CRUD from '../lookups/crud'

module.exports = function (express) {
  /*
    create: return 201 with the new object
    update: return 204 if success, 404 if not found
    delete: return 204 if success, 404 if not found
    read: return 200 with object(s) if success, 404 if id is specified but not found
    all: return 500 with error message if exception
  */
  express.response.jsonResult = function (op, data) {
    if (_.isUndefined(data) ||
        _.isNull(data) ||
        (data.rowsAffected === 0)) {
      // 404 for update|delete|read, if data is not found
      if (op === CRUD.create) {
        throw new Error('Create resource shouldn\'t return nothing')
      }
      this.status(404).json()
    } else if (op === CRUD.update || op === CRUD.delete) {
      // 204 for update|delete
      this.status(204).json()
    } else if (op === CRUD.create) {
      // 201 for create
      this.status(201).json(data)
    } else {
      // 200 for read
      this.status(200).json(data)
    }
  }
}
