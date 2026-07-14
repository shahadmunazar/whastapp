const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    planType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'starter'
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = Subscription;
