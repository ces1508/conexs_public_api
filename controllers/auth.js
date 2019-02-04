const jwt = require('jsonwebtoken')
const { Siniestros } = require('../models')
require('dotenv').config()

const authenticate = async (req, res) => {
  try {
    let { method } = req.query
    if (method === 'cedula' || method === null) {
      let user = await Siniestros.findOne({
        where: { cedula_nit: req.body.cedula },
        attributes: ['cedula_nit', 'empresa']
      })
      if (user) {
        let token = jwt.sign({ cedula: user.cedula_nit }, process.env.SECRET_TOKEN)
        return res.status(201).json({ token })
      }
    }
    res.status(401).json({ error: { message: 'por favor verifica tus credenciales' } })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATA_ERROR_ERROR', fullError: e } })
  }
}

module.exports = {
  authenticate
}
