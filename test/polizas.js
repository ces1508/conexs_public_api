const chai = require('chai')
const should  =  chai.should
const chaiHttp = require('chai-http')
const app = require('../')
require('dotenv').config()
chai.use(chaiHttp)


describe('test of polizas', () => {
  it ('should be fail with a status 401', done => {
    chai.request(app)
    .get('/polizas')
    .end((err, res) => {
      res.status.should.be.equal(401)
      done()
      if (err) return done(err)
    })
  })
  it ('should be get array of polizas', done => {
    chai.request(app)
    .get('/polizas')
    .set('authorization', `Bearer ${process.env.TOKEN_TEST}`)
    .set('content-type', 'application/json')
    .end((err, res) => {
      res.status.should.be.equal(200)
      res.body.should.have.property('polizas')
      res.body.should.be.a('array')
      done()
      if (err) return done(err)
    })
  })
})