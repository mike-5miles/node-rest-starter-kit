import UserService from './users'
import AvailableCities from './available_cities'
import db, { AdPlans } from '../models'
import pagination from '../lib/pagination'
import AppError from '../lib/errors'
import constants from '../lookups/constants'

const checkValid = function (id) {
  return (async function () {
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
          AND pc.region = pc2.region
          AND pc.city = pc2.city
          AND (p.begin_time BETWEEN p2.begin_time AND p2.end_time
            or p.end_time BETWEEN p2.begin_time AND p2.end_time)
      ) limit 1
    `
    const invalidCity = db.sequelize.query(sql,
      { replacements: [id, constants.AD_PLAN_STATE.PAID, constants.AD_PLAN_AD_TYPE_FEATURED],
        type: db.sequelize.QueryTypes.SELECT })
    if (invalidCity.length > 0) {
      throw new AppError(AppError.Type.FEATURED_PLAN_CHECK_FAILED, invalidCity[0])
    }
    return true
  })()
}

module.exports = {
  getAvailableCities: function (headers, categoryId, country, region, city) {
    return (async function () {
      await AvailableCities.getAvailableCities(headers, country, region, city)
      const sql = `
        SELECT ac.related_region AS region, ac.related_city AS city, 
          MAX(pc.end_time) + 86400 AS from_at 
        FROM available_cities ac 
        LEFT JOIN ad_plan_cities pc ON pc.city = ac.related_city AND pc.region = ac.related_region 
        LEFT JOIN ad_plans p ON p.id = pc.ad_plan_id AND p.category_id=? AND p.state = ?
        WHERE ac.region=? AND ac.city=?
        GROUP BY ac.related_city, ac.related_region
      `
      return await db.sequelize.query(sql,
        { replacements: [categoryId, constants.AD_PLAN_STATE.PAID, region, city],
          type: db.sequelize.QueryTypes.SELECT })
    })()
  },

  getHistory: function (fuzzyUser, offset, limit) {
    return (async function () {
      const userId = await UserService.getIdByFuzzy(fuzzyUser)
      const sql = `
        SELECT pc.city, p.item_id, i.title AS item_title, 
          GROUP_CONCAT(DISTINCT CONCAT(pc.begin_time, ':', pc.end_time)) AS date
        FROM ad_plans p
        INNER JOIN ad_plan_cities pc ON p.id = pc.ad_plan_id
        INNER JOIN items i ON p.item_id = i.id
        WHERE p.owner_id =? AND p.state=?
        GROUP BY pc.city, p.item_id, i.title
        ORDER BY pc.city, p.item_id, i.title
      `
      return pagination(sql, [userId, constants.AD_PLAN_STATE.PAID], offset, limit)
    })()
  },

  validate: function (id) {
    return (async function () {
      const plan = await AdPlans.findById(id)
      if (plan === null) return null
      await checkValid(id)
      return { valid: true }
    })()
  }
}
