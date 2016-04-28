'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ad_plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fuzzy_id: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(64)
      },
      title: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      owner_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      ad_type: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      ad_scope: {
        allowNull: false,
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      duration: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(10, 2)
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
      category_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      item_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable('ad_plans')
  }
}
