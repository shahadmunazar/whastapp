'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Projects', 'apiToken', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      after: 'appId'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Projects', 'apiToken');
  }
};
