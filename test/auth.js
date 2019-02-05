const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
const app = require('../index')
chai.use(chaiHttp)

describe('/POST auth', () => {
  it ('should be faild authentification', done => {
    let data = { value: '415000089', confirmation: '415500098' }
    chai.request(app)
    .post('/auth')
    .send(data)
    .end((err, res) => {
      res.status.should.equal(422)
      res.body.should.have.property('errors')
      res.body.errors.should.be.a('array')
      res.body.errors.should.have.length(1)
      res.body.errors[0].param.should.equal('value')
      done()
      if (err) done(err)
    })
  })
  it ('should be authentifacte and send jwt token', done => {
    let data = { value: '41550008', confirmation: '41550008' }
    chai.request(app)
    .post('/auth')
    .send(data)
    .end((err, res) => {
      res.status.should.equal(201)
      res.body.should.have.property('token')
      done()
      if (err) done(err)
    })
  })
  it ('should be authenticate with placas', done  => {
    let data = { value: 'CGM891', confirmation: 'CGM891' }
    chai.request(app)
    .post('/auth')
    .send(data)
    .end((err, res) => {
      res.status.should.equal(201)
      res.body.should.have.property('token')
      done()
      if (err) done(err)
    })
  })
})

