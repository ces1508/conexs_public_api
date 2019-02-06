const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')
const passport = require('passport')

// routers handle
const { polizas, auth, notifications, siniestros, profile } = require('./routers')
const { handleRoute } = require('./middlewares/utils')
const { Strategy } = require('./middlewares/passport')

const app = express()
const logDirectory = path.join(__dirname, 'logs')

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})

passport.use(Strategy)

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/auth', auth)
app.use('/profile', passport.authenticate('jwt', { session: false }), profile)
app.use('/polizas', passport.authenticate('jwt', { session: false }), polizas)
app.use('/siniestros', passport.authenticate('jwt', { session: false }), siniestros)
app.use('/notifications', passport.authenticate('jwt', { session: false }), notifications)
app.use('*', handleRoute)
app.listen(3000, err => {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }
  console.log('server running')
})

module.exports = app
