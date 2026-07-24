const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CampaignLead = sequelize.define('CampaignLead', {
    campaignId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    error: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = CampaignLead;
