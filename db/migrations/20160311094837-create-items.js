'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('items', {
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
      owner_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(255)
      },
      category_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      root_category_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      lon: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(10, 6)
      },
      lat: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(10, 6)
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
      state: {
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable('items')
  }
}
