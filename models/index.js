const Sequelize = require('sequelize')
require('dotenv').config() // only on for dev and test, remove this line for production
const SiniestrosModel = require('./siniestros')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Siniestros = SiniestrosModel(sequelize, Sequelize)

module.exports = {
  Siniestros
}
