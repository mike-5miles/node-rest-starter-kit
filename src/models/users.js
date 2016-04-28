'use strict'
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('Users', {
    nickname: DataTypes.STRING(255),
    state: DataTypes.INTEGER,
    fuzzy_id: DataTypes.STRING
  }, {
    tableName: 'users',
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  })
  return users
}
