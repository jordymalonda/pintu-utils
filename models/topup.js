const Sequelize = require('sequelize');
const db = require('../configs/database');

const Topup = db.define('topup', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  unix_code: Sequelize.STRING,
  unix_amount: Sequelize.INTEGER,
  account_number: Sequelize.STRING,
  token: Sequelize.STRING,
  callback: Sequelize.STRING,
  expire_time: Sequelize.DATE,
  createdAt: Sequelize.DATE,
  is_verify: Sequelize.INTEGER
}, {
  tableName: 'topup',
  timestamps: false
});

module.exports = Topup;
