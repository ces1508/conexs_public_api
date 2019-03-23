const { Siniestros } = require('../models')
const sequelize = require('sequelize')

const getProfile = async (req, res) => {
  try {
    let profile = await Siniestros.findOne({
      where: { cedula_nit: req.user.cedula_nit, formato: { [sequelize.Op.ne]: 'SINIESTRO' } },
      attributes: [
        'titular',
        'empresa',
        'cedula_nit',
        'formato',
        [sequelize.literal('COUNT(CASE WHEN formato = "POLIZA" THEN "poliza" END)'), 'polizas'],
        [sequelize.literal('COUNT(CASE WHEN formato = "SOAT" THEN "soat" END)'), 'soats'],
        [sequelize.literal('COUNT(CASE WHEN estado = "INACTIVO" THEN "inactives" end)'), 'inactives'],
        [sequelize.literal('COUNT(CASE WHEN estado = "ACTIVO" THEN "activo" end)'), 'actives']
      ]
    })
    res.json({ profile })
  } catch (e) {
    return res.status(500).json({ error: { code: 'FATAL_ERROR', fullError: e } })
  }
}

module.exports = {
  getProfile
}
