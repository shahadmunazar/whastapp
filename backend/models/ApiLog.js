const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApiLog = sequelize.define('ApiLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    endpoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payload: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    responseStatus: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    responsePayload: {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = ApiLog;
