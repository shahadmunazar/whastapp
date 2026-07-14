'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Insert Admin User
    await queryInterface.bulkInsert('Users', [{
      name: 'Super Admin',
      email: 'admin@dasher.com',
      password: hashedPassword,
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // Fetch the inserted user's ID
    const [adminUser] = await queryInterface.sequelize.query(
        "SELECT id FROM Users WHERE email = 'admin@dasher.com'"
    );

    // Insert Admin Subscription
    await queryInterface.bulkInsert('Subscriptions', [{
      userId: adminUser[0].id,
      planType: 'enterprise',
      status: 'active',
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 10)), // 10 years
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@dasher.com' }, {});
  }
};
