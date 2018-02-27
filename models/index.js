const fs = require('fs');
const path = require('path');
const config = require('../config/prod_config');
const mysqlConfig = config.required.mysql;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, {
  host: mysqlConfig.host,
  dialect: 'mysql',
  logging: config.dev.site.debug ? console.log : false
});

const db = {};

fs.readdirSync(__dirname).filter((file) => {
  return file.indexOf('.') !== 0 && file !== 'index.js';
}).forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));

  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
