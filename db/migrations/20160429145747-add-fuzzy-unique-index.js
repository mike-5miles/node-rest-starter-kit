'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'items',
      ['fuzzy_id'],
      {
        indexName: 'uk_fuzzy_id',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('items', 'uk_fuzzy_id')
  },

  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'users',
      ['fuzzy_id'],
      {
        indexName: 'uk_fuzzy_id',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('users', 'uk_fuzzy_id')
  },

  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'ad_plans',
      ['fuzzy_id'],
      {
        indexName: 'uk_fuzzy_id',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('ad_plans', 'uk_fuzzy_id')
  }
};
