import FeaturedService from '../services/featured'
import CRUD from '../lookups/crud'
import constants from '../lookups/constants'

module.exports = {
  getHistory: function (req, res, next) {
    const fuzzyUser = req.swagger.params[constants.X_FIVEMILES_USER_ID].value
    const offset = req.swagger.params.offset.value
    const limit = req.swagger.params.limit.value
    return FeaturedService.getHistory(fuzzyUser, offset, limit)
      .then(function (data) {
        return res.jsonResult(CRUD.read, data)
      })
  },

  getAvailableCities: function (req, res, next) {
    let headers = {}
    headers[constants.X_FIVEMILES_USER_ID] = req.swagger.params[constants.X_FIVEMILES_USER_ID].value
    headers[constants.X_FIVEMILES_USER_TOKEN] = req.swagger.params[constants.X_FIVEMILES_USER_TOKEN].value

    const categoryId = req.swagger.params.category.value
    const country = req.swagger.params.country.value
    const region = req.swagger.params.region.value
    const city = req.swagger.params.city.value
    return FeaturedService.getAvailableCities(headers, categoryId, country, region, city)
      .then(function (data) {
        return res.jsonResult(CRUD.read, data)
      })
  },

  validate: function (req, res, next) {
    const id = req.swagger.params.id.value
    return FeaturedService.validate(id)
      .then(function (data) {
        return res.jsonResult(CRUD.read, data)
      })
  }
}
