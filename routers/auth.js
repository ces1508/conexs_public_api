const Router = require('express').Router()
const { authenticate } = require('../controllers/auth')
const { query, body } = require('express-validator/check')

const { validate } = require('../middlewares/utils')

Router.post('/', [
  query('method').isString().optional(),
  body('value').custom((value, { req }) => {
    if (value.toLowerCase() !== req.body.confirmation.toLowerCase()) {
      throw new Error('la contrasenia o el codigo esta mal')
    }
    return true
  })
], validate, authenticate)

module.exports = Router
