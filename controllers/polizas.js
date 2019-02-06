const sequelize = require('sequelize')
const { Siniestros } = require('../models')

const getAllPolizas = async (req, res) => {
  try {
    let polizas = await Siniestros.findAll({
      where: { cedula_nit: req.user.cedula_nit },
      attributes: {
        include: [[sequelize.literal('COUNT (CASE WHEN formato = "SINIESTRO" THEN "a" END)'), 'AMOUNT_SINISTERS']]
      },
      group: 'poliza',
      limit: 20,
      offset: req.params.skip || 0
    })
    res.json({ polizas })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR', fullError: e } })
  }
}

module.exports = {
  getAllPolizas
}
