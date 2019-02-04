const Router = require('express').Router()
const { authenticate } = require('../controllers/auth')

Router.post('/', authenticate)

module.exports = Router
