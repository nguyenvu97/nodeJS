const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test2', 'root', 'Vu123456', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;
