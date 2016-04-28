'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'ad_plans',
      ['owner_id'],
      {
        indexName: 'idx_owner_id'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('ad_plans', 'idx_owner_id')
  }
};
