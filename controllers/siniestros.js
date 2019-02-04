const { Siniestros } = require('../models')

const getAllPolizas = async (req, res) => {
  try {
    let polizas = await Siniestros.findaLL({
      where: { cedula_nit: req.user.cedula },
      limit: 20,
      offset: req.params.skip
    })
    res.json(polizas)
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR' } }).json({ error: e })
  }
}

module.exports = {
  getAllPolizas
}
