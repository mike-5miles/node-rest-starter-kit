import moment from 'moment'
import db, { AvailableCities } from '../models'
import CityAPI from '../apis/cities'

const getLastUpdatedAt = function (country, region, city) {
  return (async function () {
    const lastUpdatedAt = await AvailableCities.max('updated_at', { where: {region, city} })
    return (lastUpdatedAt === null) ? 0 : moment(lastUpdatedAt).unix()
  })()
}

module.exports = {
  getAvailableCities: function (country, region, city) {
    // temporarily: upate available cities from api every 24 hours
    return (async function () {
      const lastUpdatedAt = await getLastUpdatedAt(country, region, city)
      const now = moment().unix()

      // if within 24 hours, do nothing
      if (now - lastUpdatedAt <= 86400) return

      // fetch from api
      const cities = await CityAPI.fetchRelatedCities(country, region, city)

      // do nothing if got nothing
      if (cities.length === 0) return

      cities.forEach((o) => {
        o.related_region = o.region
        o.related_city = o.city
        o.related_city_id = o.id
        o.id = null
        o.region = region
        o.city = city
      })
      // save into database
      return await db.sequelize.transaction(function (t) {
        return (async function () {
          await AvailableCities.destroy({where: {region, city}})
          await AvailableCities.bulkCreate(cities)
        })()
      })
    })()
  }
}
