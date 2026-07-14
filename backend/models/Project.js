const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    appId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apiToken: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    secretToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    webhookUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'disconnected' // disconnected, connected
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    paranoid: true
});

module.exports = Project;
