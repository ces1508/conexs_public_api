const sequelize = require('sequelize')
const { Siniestros } = require('../models')

const getPolizasSoat = async (type, user, query) => {
  let filter = {}
  if (query.actives) {
    filter = { ...filter, estado: 'ACTIVO' }
  }
  if (query.siniesters) {
    filter = {
      ...filter,
      formato: {
        [sequelize.Op.eq]: 'SINIESTRO'
      }
    }
  }
  try {
    let polizas = await Siniestros.findAll({
      where: {
        cedula_nit: user,
        formato: { [sequelize.Op.ne]: type === 'POLIZA' ? 'SOAT' : 'POLIZA' },
        ...filter
      },
      attributes: {
        include: [[sequelize.literal('COUNT (CASE WHEN formato = "SINIESTRO" THEN "a" END)'), 'amount_sinisters']]
      },
      group: 'poliza',
      limit: 20,
      offset: parseInt(query.skip) || 0
    })
    console.log(polizas)
    return polizas.filter(item => item.formato === ((Object.prototype.hasOwnProperty.call(query, 'siniesters') ? 'SINIESTRO' : 'POLIZA')))
  } catch (e) {
    console.log(e)
    return { error: true, fullError: new Error(e) }
  }
}

module.exports = {
  getPolizasSoat
}
