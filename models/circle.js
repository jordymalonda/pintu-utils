const Sequelize = require('sequelize');
const db = require('../configs/database');

const Circle = db.define('circle_trade', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER },
  quote_id: Sequelize.STRING,
  quote_date: Sequelize.INTEGER,
  expiration_date: Sequelize.INTEGER,
  side: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  volume: Sequelize.DECIMAL,
  value: Sequelize.DECIMAL
}, {
  tableName: 'circle_trade',
  timestamps: false
});

module.exports = Circle;
