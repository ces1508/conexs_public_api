const sequelize = require('sequelize')
const { Siniestros } = require('../models')

const getPolizasSoat = async (type, user, query) => {
  let filter = {
    formato: { [sequelize.Op.ne]: type === 'POLIZA' ? 'SOAT' : 'POLIZA' }
  }
  query.actives = query.actives === 'true'
  query.siniesters = query.siniesters === 'true'
  if (query.actives) {
    filter = { ...filter, estado: 'ACTIVO' }
  }
  if (query.siniesters) {
    console.log('entramos a siniestros')
    filter = {
      ...filter,
      formato: {
        [sequelize.Op.eq]: 'SINIESTRO'
      }
    }
  }
  try {
    console.log(query)
    let polizas = await Siniestros.findAll({
      where: {
        cedula_nit: user,
        ...filter
      },
      attributes: {
        include: [[sequelize.literal('COUNT (CASE WHEN formato = "SINIESTRO" THEN "a" END)'), 'amount_sinisters']]
      },
      group: 'poliza',
      limit: 20,
      offset: parseInt(query.skip) || 0
    })
    return polizas.filter(item => item.formato === (query.siniesters ? 'SINIESTRO' : type))
  } catch (e) {
    console.log(e)
    return { error: true, fullError: new Error(e) }
  }
}

module.exports = {
  getPolizasSoat
}
