'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('available_cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      region: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(100)
      },
      related_region: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING
      },
      related_city: {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING(100)
      },
      related_city_id: {
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
    return queryInterface.dropTable('available_cities')
  }
}
