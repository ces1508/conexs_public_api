const sequelize = require('sequelize')
const { Siniestros } = require('../models')

const getAllSoats = async (req, res) => {
  try {
    let soats = await Siniestros.findAll({
      where: { cedula_nit: req.user.cedula_nit, formato: { [sequelize.Op.ne]: 'POLIZA' } },
      attributes: {
        include: [[sequelize.literal('COUNT (CASE WHEN formato = "SINIESTRO" THEN "a" END)'), 'amount_sinisters']]
      },
      group: 'poliza',
      limit: 20,
      offset: parseInt(req.query.skip) || 0
    })
    soats = soats.filter(item => item.formato !== 'SINIESTRO')
    res.json({ soats })
  } catch (e) {
    console.log('error', e)
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR', fullError: e } })
  }
}

module.exports = {
  getAllSoats
}
