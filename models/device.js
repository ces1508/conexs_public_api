const Device = (sequelize, type) => {
  return sequelize.define('gcm', {
    uuid: { type: type.TEXT, primaryKey: true },
    regId: { type: type.TEXT },
    user_id: { type: type.INTEGER },
    kind: {
      type: type.TEXT,
      defaultValue: 'onesignal'
    }
  })
}

module.exports = Device
