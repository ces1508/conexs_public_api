const { getPolizasSoat } = require('../utils')

const getAllSoats = async (req, res) => {
  let soats = await getPolizasSoat('SOAT', req.user.cedula_nit, req.query)
  if (!soats.error) return res.status(200).json(soats)
  res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR', fullError: e } })
}

module.exports = {
  getAllSoats
}
