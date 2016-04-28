'use strict'
module.exports = function (sequelize, DataTypes) {
  var availableCities = sequelize.define('AvailableCities', {
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    related_city: DataTypes.STRING,
    related_region: DataTypes.STRING
  }, {
    tableName: 'available_cities',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return availableCities
}
