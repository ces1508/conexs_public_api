const Route = require('express').Router()

Route.get('/', (req, res) => {
  res.send('lista de la polizas del cliente')
})
module.exports = Route
