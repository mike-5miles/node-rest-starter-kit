'use strict'
module.exports = function (sequelize, DataTypes) {
  var adPlans = sequelize.define('AdPlans', {
    title: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    ad_type: DataTypes.INTEGER,
    ad_scope: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(10, 2),
    begin_time: DataTypes.BIGINT,
    end_time: DataTypes.BIGINT,
    state: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    // order_state: DataTypes.INTEGER,
    fuzzy_id: DataTypes.STRING
  }, {
    tableName: 'ad_plans',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        models.AdPlans.hasMany(models.AdPlanItems, {foreignKey: 'ad_plan_id'})
        models.AdPlans.hasMany(models.AdPlanCities, {foreignKey: 'ad_plan_id'})
      }
    }
  })
  return adPlans
}
