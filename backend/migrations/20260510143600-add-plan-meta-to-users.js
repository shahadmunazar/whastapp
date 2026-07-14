'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'planExpiresAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'planStatus', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active', // active, inactive, expired
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'planExpiresAt');
    await queryInterface.removeColumn('Users', 'planStatus');
  }
};
