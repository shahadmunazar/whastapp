'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'plan', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'starter', // starter, professional, enterprise
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'plan');
  }
};
