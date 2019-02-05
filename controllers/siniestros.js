const { Siniestros } = require('../models')

const getSiniester = async (req, res) => {
  try {
    let { poliza } = req.params
    let polizas = await Siniestros.findaLL({
      where: { cedula_nit: req.user.cedula_nit, formato: 'SINIESTRO', poliza: poliza },
      limit: 20,
      offset: req.params.skip || 0
    })
    res.json(polizas)
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR' } }).json({ error: e })
  }
}

module.exports = {
  getSiniester
}
