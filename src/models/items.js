'use strict'
module.exports = function (sequelize, DataTypes) {
  var items = sequelize.define('Items', {
    owner_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    root_category_id: DataTypes.INTEGER,
    lon: DataTypes.DECIMAL(10, 6),
    lat: DataTypes.DECIMAL(10, 6),
    state: DataTypes.INTEGER,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    title: DataTypes.STRING,
    fuzzy_id: DataTypes.STRING
  }, {
    tableName: 'items',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return items
}
