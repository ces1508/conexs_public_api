const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../index')
chai.use(chaiHttp)

describe('/POST auth', () => {
  it ('should be faild authentification', done => {
    let data = { cedula: '415000089', confirmation: '415500098' }
    chai.request(app)
    .post('/auth')
    .send(data)
    .end((err, res) => {
      res.status.should.equal(401)
      res.body.should.have.property('error')
      res.body.error.message.should.eql('por favor verifica tus credenciales')
      done()
      if (err) done(err)
    })
  })
  it ('should be authentifacte and send jwt token', done => {
    let data = { cedula: '41550008', confirmation: '41550008' }
    chai.request(app)
    .post('/auth')
    .query({ method: 'cedula' })
    .send(data)
    .end((err, res) => {
      res.status.should.equal(201)
      res.body.should.have.property('token')
      done()
      if (err) done(err)
    })
  })
})

