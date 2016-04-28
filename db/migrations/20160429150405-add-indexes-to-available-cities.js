'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addIndex(
      'available_cities',
      ['region', 'city'],
      {
        indexName: 'idx_region_city'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('available_cities', 'idx_region_city')
  }
};
