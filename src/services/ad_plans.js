import shortid from 'shortid'

import UserService from './users'
import ItemService from './items'
import FeaturedService from './featured'
import db, { AdPlans, AdPlanCities } from '../models'
import constants from '../lookups/constants'

module.exports = {
  create: function (fuzzyUser, plan) {
    return (async function () {
      plan.fuzzy_id = shortid.generate()
      plan.owner_id = await UserService.getIdByFuzzy(fuzzyUser)

      return await db.sequelize.transaction(function (t) {
        return (async function () {
          // insert or update item
          plan.item.owner_id = plan.owner_id
          plan.item.category_id = plan.category_id
          plan.item.root_category_id = plan.root_category_id
          plan.item.state = constants.ITEM_STATE.LISTING
          await ItemService.upsert(plan.item)
          // create ad_plan
          const newPlan = await AdPlans.create(plan)
          // create cities
          plan.cities.forEach(function (city) {
            city.ad_plan_id = newPlan.id
          })
          await AdPlanCities.bulkCreate(plan.cities)
          // check valid
          await FeaturedService.validate(newPlan.id)
          // return
          return { id: newPlan.id }
        })()
      })
    })()
  },

  pay: function (id, orderId) {
    return (async function () {
      const plan = await AdPlans.findById(id)
      if (plan === null) return null
      return plan.update({
        order_id: orderId,
        state: constants.AD_PLAN_STATE.PAID})
    })()
  }
}
