'use strict'
module.exports = function (sequelize, DataTypes) {
  var adPlanItems = sequelize.define('AdPlanItems', {
    ad_plan_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER
  }, {
    tableName: 'ad_plan_items',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return adPlanItems
}
