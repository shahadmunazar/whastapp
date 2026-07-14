const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SalesQuery = sequelize.define('SalesQuery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // pending, resolved
    }
}, {
    timestamps: true,
    tableName: 'sales_queries'
});

module.exports = SalesQuery;
