'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Projects', 'number', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'name'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Projects', 'number');
  }
};
