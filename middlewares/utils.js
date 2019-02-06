const { validationResult } = require('express-validator/check')

const validate = (req, res, next) => {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  next()
}

const handleRoute = (req, res) => {
  res.status(403).json({ error: { type: 'unAuthorizade' } })
}

module.exports = {
  validate,
  handleRoute
}
