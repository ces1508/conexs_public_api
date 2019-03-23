const router = require('express').Router()
const { create } = require('../controllers/device')
const { body } = require('express-validator/check')
const { validate } = require('../middlewares/utils')

router.post('/', [
  body('regId').isString().exists()
], validate, create)

module.exports = router
