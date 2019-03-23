const route = require('express').Router()
const { getAllSoats } = require('../controllers/soats')

route.get('/', getAllSoats)

module.exports = route
