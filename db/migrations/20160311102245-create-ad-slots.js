'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ad_slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ad_type: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      ad_count: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('ad_slots')
  }
}
