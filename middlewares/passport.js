const JwtStrategy  = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { Siniestros } = require('../models/')
require('dotenv').config()

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.issuer = 'api.conexseguros.com'
opts.secretOrKey = process.env.SECRET_TOKEN
// opts.audience = 'app.conexseguros'

exports.Strategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    let user = await Siniestros.findOne({
      where: { cedula_nit: payload.cedula }
    })
    if (user) return done(null, user)
    done(null, false)
  } catch (e) {
    return done(null, fase)
  }
})


