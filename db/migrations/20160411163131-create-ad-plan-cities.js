'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ad_plan_cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ad_plan_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      region: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(64)
      },
      city: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(255)
      },
      city_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      begin_time: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.BIGINT
      },
      end_time: {
        allowNull: false,
        defaultValue: 4070880000000,
        type: Sequelize.BIGINT
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
    return queryInterface.dropTable('ad_plan_cities')
  }
}
