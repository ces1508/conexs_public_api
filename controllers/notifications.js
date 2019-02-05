const sequelize = require('sequelize')
const { Notifications } = require('../models')

const getAllNotifications = async (req, res) => {
  try {
    let polizas = await Notifications.findAll({
      where: { [sequelize.Op.or]: [{ user: req.user.cedula_nit }, { user: 0 }] },
      attributes: { include: [[sequelize.fn('COUNT')]] },
      limit: 20,
      offset: req.params.skip || 0
    })
    res.json({ polizas })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR' } })
  }
}

module.exports = {
  getAllNotifications
}
