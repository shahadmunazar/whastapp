'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'website', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'avatar', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'bio');
    await queryInterface.removeColumn('Users', 'location');
    await queryInterface.removeColumn('Users', 'website');
    await queryInterface.removeColumn('Users', 'avatar');
  }
};
