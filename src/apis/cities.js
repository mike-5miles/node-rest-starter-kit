import rp from 'request-promise'
import _debug from 'debug'

import config from '../../config'

const debug = _debug('app:api:cities')

module.exports = {
  fetchRelatedCities: function (headers, country, region, city) {
    const url = config.api.bi.basePath + '/citys/'
    debug(url)
    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      formData: { country, region, city },
      json: true,
      timeout: config.api.timeout
    }

    return (async function () {
      const res = await rp(options)
      return res.citys
    })()
  }
}
