const sequelize = require('sequelize')
const { Notifications } = require('../models')

const getAllNotifications = async (req, res) => {
  try {
    let notifications = await Notifications.findAll({
      where: { [sequelize.Op.or]: [ { user: req.user.cedula_nit }, { user: 0 } ] },
      limit: 40,
      order: [['id', 'DESC']],
      offset: req.params.skip || 0
    })
    res.json({ notifications })
  } catch (e) {
    return res.status(500).json({ error: { message: 'FATAL_SERVER_ERROR' } })
  }
}

module.exports = {
  getAllNotifications
}
