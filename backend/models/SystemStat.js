const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SystemStat = sequelize.define('SystemStat', {
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = SystemStat;
