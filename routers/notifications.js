const Route = require('express').Router()
const { getAllNotifications } = require('../controllers/notifications')
const { query } = require('express-validator/check')
const { validate } = require('../middlewares/utils')

Route.get('/', [
  query('skip').isInt().optional()
], validate, getAllNotifications)

module.exports = Route
