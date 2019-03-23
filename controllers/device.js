const { Device } = require('../models')

const create = async (req, res) => {
  try {
    let { cedula_nit } = req.user // eslint-disable-line
    let data = {
      user_id: cedula_nit,
      regId: req.body.regId
    }
    let verifyIfExits = await Device.findAll({
      where: data
    })
    if (verifyIfExits.length >= 1) {
      return res.status(200).end()
    }
    await Device.create({ ...data, kind: 'onesignal' })
    res.status(201).json({ status: 'created' })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

module.exports = {
  create
}
