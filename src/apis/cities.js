import FormData from 'form-data'
import _debug from 'debug'

import config from '../../config'
import { appLogger } from '../lib/logger'

const debug = _debug('app:api:cities')

module.exports = {
  fetchRelatedCities: function (country, region, city) {
    const url = config.api.bi.basePath + '/citys/'
    debug(url)

    let form = new FormData()
    form.append('country', country)
    form.append('region', region)
    form.append('city', city)

    const fetch = require('node-fetch')
    return fetch(url, { method: 'POST', body: form, timeout: config.api.timeout })
      .then(function (res) {
        return res.json()
      }).then(function (json) {
        return json.citys || []
      }).catch(function (e) {
        appLogger.error(e.stack || e)
        return []
      })
  }
}
