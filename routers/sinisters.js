const Route = require('express').Router()
const { query } = require('express-validator/check')
const { getSiniester } = require('../controllers/siniestros')
const { validate } = require('../middlewares/utils')

Route.get('/:id', [
  query('poliza').isString().exists()
], validate, getSiniester)

module.exports = Route
