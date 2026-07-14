'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Manual Associations
db.User.hasOne(db.Subscription, { foreignKey: 'userId', as: 'subscription' });
db.Subscription.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.User.hasMany(db.Project, { foreignKey: 'userId', as: 'projects' });
db.Project.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Project.hasMany(db.Message, { foreignKey: 'projectId', as: 'messages' });
db.Message.belongsTo(db.Project, { foreignKey: 'projectId', as: 'project' });

db.User.hasMany(db.Payment, { foreignKey: 'userId', as: 'payments' });
db.Payment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.User.hasMany(db.Campaign, { foreignKey: 'userId', as: 'campaigns' });
db.Campaign.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Project.hasMany(db.Campaign, { foreignKey: 'projectId', as: 'campaigns' });
db.Campaign.belongsTo(db.Project, { foreignKey: 'projectId', as: 'project' });

db.Campaign.hasMany(db.CampaignLead, { foreignKey: 'campaignId', as: 'leads' });
db.CampaignLead.belongsTo(db.Campaign, { foreignKey: 'campaignId', as: 'campaign' });

db.User.hasMany(db.ApiLog, { foreignKey: 'userId', as: 'apiLogs' });
db.ApiLog.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.Project.hasMany(db.ApiLog, { foreignKey: 'projectId', as: 'apiLogs' });
db.ApiLog.belongsTo(db.Project, { foreignKey: 'projectId', as: 'project' });

db.User.hasMany(db.SalesQuery, { foreignKey: 'userId', as: 'salesQueries' });
db.SalesQuery.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
