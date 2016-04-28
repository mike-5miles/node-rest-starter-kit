import { Items } from '../models'

module.exports = {
  upsert: function (item) {
    return (async function () {
      return await Items.upsert(item)
    })()
  }
}
