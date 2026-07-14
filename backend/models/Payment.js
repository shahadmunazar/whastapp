const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    planType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    billingCycle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'completed'
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Payment;
