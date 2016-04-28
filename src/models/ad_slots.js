'use strict'
module.exports = function (sequelize, DataTypes) {
  var adSlots = sequelize.define('AdSlots', {
    ad_type: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    ad_count: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    tableName: 'ad_slots',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return adSlots
}
