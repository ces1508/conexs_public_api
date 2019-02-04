const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream')

// routers handle
const { siniestros, auth } = require('./routers')

const app = express()
const logDirectory = path.join(__dirname, 'logs')

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})

app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))

app.use('/siniestros', siniestros)
app.use('/auth', auth)
app.get('/', (req, res) => {
  res.send('hola mundo')
})

app.listen(3000, err => {
  if (err) {
    console.log(err.stack)
    process.exit(1)
  }
  console.log('server running')
})

module.exports = app
