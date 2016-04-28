import moment from 'moment'

const datetime = {
  timestampToUtcDay: function (timestamp) {
    const d = moment(timestamp * 1)
    return d.utc().format('YYYY-MM-DD 00:00:00')
  },

  timestampToUtcTime: function (timestamp) {
    const d = moment(timestamp * 1)
    return d.utc().format('YYYY-MM-DD HH:mm:ss')
  }
}

const generateTemplateString = (function () {
  let cache = {}
  function generateTemplate (template) {
    let fn = cache[template]

    if (!fn) {
      // Replace ${expressions} (etc) with ${map.expressions}.
      var sanitized = template
      .replace(/\$\{([\s]*[^;\s]+[\s]*)\}/g, function (_, match) {
        return `\$\{map.${match.trim()}\}`
      })
      // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
      .replace(/(\$\{(?!map\.)[^}]+\})/g, '')

      fn = Function('map', `return \`${sanitized}\``) // eslint-disable-line
    }
    return fn
  }
  return generateTemplate
})()

module.exports = { datetime, generateTemplateString }
