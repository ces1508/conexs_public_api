const Route = require('express').Router()
const { getProfile } = require('../controllers/profile')

Route.get('/', getProfile)

module.exports = Route
