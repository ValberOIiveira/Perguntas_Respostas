//Conentando com Sequelize

const Sequelize = require('sequelize');
const connection = new Sequelize('perguntasrespostas', 'root', 'batatinhafrita1@', {
  host: 'localhost',
  dialect: 'mysql'
})


module.exports = connection;
