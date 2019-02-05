const jwt = require('jsonwebtoken')
const { Siniestros } = require('../models')
require('dotenv').config()

const reg = new RegExp('^[a-zA-Z]{3}[0-9]{2}[a-zA-Z0-9]?$') // validate if a placa

const authenticate = async (req, res) => {
  try {
    let { value } = req.body
    let method = value.match(reg) ? 'placas' : 'cedula_nit'
    let user = await Siniestros.findOne({
      where: { [method === 'placas' ? 'placas' : 'cedula_nit']: req.body.value.toUpperCase() },
      attributes: ['cedula_nit', 'empresa']
    })
    if (user) {
      let token = jwt.sign({
        cedula: user.cedula_nit,
        audience: 'app.conexseguros',
        issuer: 'api.conexseguros.com'
      }, process.env.SECRET_TOKEN)
      return res.status(201).json({ token })
    }
    res.status(401).json({ error: { message: 'por favor verifica tus credenciales' } })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATA_ERROR_ERROR', fullError: e } })
  }
}

module.exports = {
  authenticate
}
