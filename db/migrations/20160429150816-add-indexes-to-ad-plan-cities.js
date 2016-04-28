'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'ad_plan_cities',
      ['ad_plan_id'],
      {
        indexName: 'idx_ad_plan_id'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('ad_plan_cities', 'idx_ad_plan_id')
  },

  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'ad_plan_cities',
      ['region', 'city'],
      {
        indexName: 'idx_region_city'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('ad_plan_cities', 'idx_region_city')
  }  
};
