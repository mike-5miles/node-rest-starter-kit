'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fuzzy_id: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(64)
      },
      nickname: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(255)
      },
      state: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
}
