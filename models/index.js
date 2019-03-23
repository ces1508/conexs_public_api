const Sequelize = require('sequelize')
require('dotenv').config() // only on for dev and test, remove this line for production
const SiniestrosModel = require('./siniestros')
const NotifactionsModel = require('./notifications')
const DeviceModel = require('./device')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false,
    freezeTableName: true
  }
})

const Siniestros = SiniestrosModel(sequelize, Sequelize)
const Notifications = NotifactionsModel(sequelize, Sequelize)
const Device = DeviceModel(sequelize, Sequelize)

module.exports = {
  Siniestros,
  Notifications,
  Device
}
