'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('CampaignLeads', 'name', {
        type: Sequelize.STRING,
        allowNull: true
      });
    } catch (e) {
      console.log("Column 'name' might already exist, skipping: ", e.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('CampaignLeads', 'name');
    } catch (e) {
      console.log("Column 'name' might not exist, skipping: ", e.message);
    }
  }
};
