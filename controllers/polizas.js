const { getPolizasSoat } = require('../utils')
const getAllPolizas = async (req, res) => {
  let polizas = await getPolizasSoat('POLIZA', req.user.cedula_nit, req.query)
  if (!polizas.error) return res.json({ polizas })
  res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR', fullError: polizas.fullError } })
}

module.exports = {
  getAllPolizas
}
