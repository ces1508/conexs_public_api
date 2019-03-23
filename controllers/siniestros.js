const { Siniestros } = require('../models')

const getSiniester = async (req, res) => {
  try {
    let { poliza } = req.params
    let sinisters = await Siniestros.findAll({
      where: { formato: 'SINIESTRO', poliza: poliza },
      limit: 20,
      offset: req.params.skip || 0
    })
    res.json({ sinisters })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR', fullError: e } })
  }
}

module.exports = {
  getSiniester
}
