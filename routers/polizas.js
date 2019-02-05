const Route = require('express').Router()
const { getAllPolizas } = require('../controllers/polizas')

Route.get('/', getAllPolizas)

module.exports = Route
