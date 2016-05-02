import AdPlanService from '../services/ad_plans'
import CRUD from '../lookups/crud'
import constants from '../lookups/constants'

module.exports = {
  create: function (req, res, next) {
    const fuzzyUser = req.swagger.params[constants.X_FIVEMILES_USER_ID].value
    const plan = req.swagger.params.plan.value
    return AdPlanService.create(fuzzyUser, plan)
      .then(function (data) {
        return res.jsonResult(CRUD.create, data)
      })
  },

  pay: function (req, res, next) {
    const id = req.swagger.params.id.value
    const orderId = req.swagger.params.order.value.order_id
    return AdPlanService.pay(id, orderId)
      .then(function (data) {
        return res.jsonResult(CRUD.update, data)
      })
  }
}