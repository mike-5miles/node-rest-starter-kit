'use strict'
module.exports = function (sequelize, DataTypes) {
  var adPlanCities = sequelize.define('AdPlanCities', {
    ad_plan_id: DataTypes.INTEGER,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    begin_time: DataTypes.BIGINT,
    end_time: DataTypes.BIGINT
  }, {
    tableName: 'ad_plan_cities',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return adPlanCities
}
