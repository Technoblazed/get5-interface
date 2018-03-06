const config = require('../lib/_init').config;
const fs = require('fs');
const mysql = config('required.mysql');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
  host: mysql.host,
  dialect: 'mysql',
  logging: config('dev.site.debug') ? console.log : false,
  operatorsAliases: false
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
