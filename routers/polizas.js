const Route = require('express').Router()
const { getAllPolizas } = require('../controllers/polizas')
const { handleRoute } = require('../middlewares/utils')

Route.get('/', getAllPolizas)
Route.use('*', handleRoute)

module.exports = Route
