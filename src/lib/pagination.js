import db from '../models'

module.exports = function (sql, params, offset, limit) {
  return (async function () {
    const sqlCount = 'SELECT count(*) as count FROM (' + sql + ') t'
    const count = await db.sequelize.query(sqlCount,
      { replacements: params, type: db.sequelize.QueryTypes.SELECT })
    const totalCount = count[0].count

    let next = null
    let previous = null
    let objects = []
    if (totalCount > 0) {
      const sqlResult = sql + ' LIMIT ?, ? '
      objects = await db.sequelize.query(sqlResult,
        { replacements: [...params, offset, limit], type: db.sequelize.QueryTypes.SELECT })

      const size = objects.length
      if (offset + size < totalCount) {
        next = `?offset=${offset + size}&limit=${limit}`
      }
      if (offset > 0) {
        previous = `?offset=${Math.max(offset - limit, 0)}&limit=${limit}`
      }
    }

    return {
      meta: { next, previous, total_count: totalCount, offset, limit },
      objects
    }
  })()
}
