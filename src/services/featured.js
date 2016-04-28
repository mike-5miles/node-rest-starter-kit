import UserService from './users'
import AvailableCities from './available_cities'
import db, { AdPlans, Items } from '../models'
import pagination from '../lib/pagination'
import AppError from '../lib/errors'
import constants from '../lookups/constants'

const isValid = function (plan) {
  return (async function () {
    // check plan status
    if (plan.state !== constants.AD_PLAN_STATE.PENDING) {
      throw new AppError(AppError.Type.FEATURED_PLAN_NOT_PENDING)
    }
    // check item listing status
    const item = await Items.findById(plan.item_id)
    if (item === null || item.state !== constants.ITEM_STATE.LISTING) {
      throw new AppError(AppError.Type.FEATURED_LISTING_CHECK_FAILED)
    }
    // check city time
    const sql = `
      SELECT pc.city, pc.begin_time, pc.end_time
      FROM ad_plans p
      JOIN ad_plan_cities pc ON p.id = pc.ad_plan_id
      WHERE p.id = ? AND EXISTS (
        SELECT 1
        FROM ad_plans p2
        JOIN ad_plan_cities pc2 ON p2.id = pc2.ad_plan_id
        WHERE p2.state = ? and p.ad_type = ?
          AND p.category_id = p2.category_id
          AND p2.id <> p.id
          AND pc.region = pc2.region
          AND pc.city = pc2.city
          AND p.begin_time < p2.end_time
      ) limit 1
    `
    const invalidCity = await db.sequelize.query(sql,
      { replacements: [plan.id, constants.AD_PLAN_STATE.PAID, constants.AD_PLAN_AD_TYPE.FEATURED],
        type: db.sequelize.QueryTypes.SELECT })
    if (invalidCity.length > 0) {
      throw new AppError(AppError.Type.FEATURED_CITY_CHECK_FAILED, invalidCity[0])
    }
    return true
  })()
}

module.exports = {
  getAvailableCities: function (categoryId, country, region, city) {
    return (async function () {
      await AvailableCities.getAvailableCities(country, region, city)
      const sql = `
        SELECT ac.related_region AS region, ac.related_city AS city, 
          MAX(pc.end_time) AS end_time
        FROM available_cities ac 
        LEFT JOIN (
          SELECT c.region, c.city, c.end_time
          FROM ad_plan_cities c 
          INNER JOIN ad_plans p ON p.id = c.ad_plan_id 
          WHERE p.category_id=? AND p.ad_type=? AND p.state=?
        ) pc ON pc.city = ac.related_city AND pc.region = ac.related_region 
        WHERE ac.region=? AND ac.city=?
        GROUP BY ac.related_city, ac.related_region
      `
      return await db.sequelize.query(sql,
        { replacements: [categoryId, constants.AD_PLAN_AD_TYPE.FEATURED, constants.AD_PLAN_STATE.PAID, region, city],
          type: db.sequelize.QueryTypes.SELECT })
    })()
  },

  getHistory: function (fuzzyUser, offset, limit) {
    return (async function () {
      const userId = await UserService.getIdByFuzzy(fuzzyUser)
      const sql = `
        SELECT pc.city, p.item_id, i.title AS item_title, 
          GROUP_CONCAT(DISTINCT CONCAT(pc.begin_time, ':', pc.end_time)) AS date_scope
        FROM ad_plans p
        INNER JOIN ad_plan_cities pc ON p.id = pc.ad_plan_id
        INNER JOIN items i ON p.item_id = i.id
        WHERE p.owner_id =? AND p.ad_type=? AND p.state=?
        GROUP BY pc.city, p.item_id, i.title
        ORDER BY pc.city, p.item_id, i.title
      `
      return pagination(sql, [userId, constants.AD_PLAN_AD_TYPE.FEATURED, constants.AD_PLAN_STATE.PAID], offset, limit)
    })()
  },

  checkValid: function (id) {
    return (async function () {
      const plan = await AdPlans.findById(id)
      if (plan === null) return null
      await isValid(plan)
      return { valid: true }
    })()
  }
}
