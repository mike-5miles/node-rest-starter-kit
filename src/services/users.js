import { Users } from '../models'
import AppError from '../lib/errors'

module.exports = {
  getIdByFuzzy: function (fuzzy) {
    return (async function () {
      const user = await Users.findOne({where: {fuzzy_id: fuzzy}})
      if (user === null) {
        throw new AppError(AppError.Type.INVALID_USER)
      }
      return user.id
    })()
  }
}
