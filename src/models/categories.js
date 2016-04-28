'use strict'
module.exports = function (sequelize, DataTypes) {
  var categories = sequelize.define('Categories', {
    title: DataTypes.STRING(50),
    parent_id: DataTypes.INTEGER,
    state: DataTypes.INTEGER
  }, {
    tableName: 'categories',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return categories
}
