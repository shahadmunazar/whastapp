'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      planType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'starter'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Remove plan related columns from Users table
    await queryInterface.removeColumn('Users', 'plan');
    await queryInterface.removeColumn('Users', 'planExpiresAt');
    await queryInterface.removeColumn('Users', 'planStatus');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Subscriptions');
    
    // Add columns back to Users table in case of rollback
    await queryInterface.addColumn('Users', 'plan', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'starter'
    });
    await queryInterface.addColumn('Users', 'planExpiresAt', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'planStatus', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active'
    });
  }
};
