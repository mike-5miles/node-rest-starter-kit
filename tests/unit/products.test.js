import request from 'supertest'
import chai from 'chai'
import app from '../../src/server'
import models from '../../src/models'

const expect = chai.expect
const Product = models.products

const checkErrorResponse = function (resText, type) {
  const err = JSON.parse(resText)
  expect(err).to.have.keys('error')
  expect(err.error).to.have.all.keys(['code', 'message'])
  if (type) {
    expect(err.error.code).to.have.string(type)
  }
}

describe('API: products', function () {
  before(function (done) {
    Product.sync({ force: true })
      .then(function () {
        done()
      })
      .catch(function (error) {
        done(error)
      })
  })

  it('should add a SINGLE product on /products POST', function (done) {
    const postData = {
      'name': 'test'
    }
    request(app)
      .post('/api/v1/products')
      .type('json')
      .send(postData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        const data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(data.id).to.equal(1)
        expect(data.name).to.equal(postData.name)
        done()
      })
  })

  it('should get 400 on /products POST if bad post data', function (done) {
    const postData = {
      'name': 'test',
      'state': 11   // enum 1,2
    }
    request(app)
      .post('/api/v1/products')
      .type('json')
      .send(postData)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        checkErrorResponse(res.text, 'Error')
        done(err)
      })
  })

  it('should list ALL products on /products GET', function (done) {
    request(app)
      .get('/api/v1/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(data.length).to.equal(1)
        expect(data[0].id).to.equal(1)
        expect(data[0].name).to.equal('test')
        done()
      })
  })

  it('should update a SINGLE product on /products/1 PUT', function (done) {
    const postData = {
      name: 'new'
    }
    request(app)
      .put('/api/v1/products/1')
      .type('json')
      .send(postData)
      .expect(204)
      .end(function (err, res) {
        expect(err).to.be.null
        done()
      })
  })

  it('should get 404 on /products/2 PUT', function (done) {
    const postData = {
      name: 'new'
    }
    request(app)
      .put('/api/v1/products/2')
      .type('json')
      .send(postData)
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        done(err)
      })
  })

  it('should get a SINGLE product on /products/1 GET', function (done) {
    request(app)
      .get('/api/v1/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(data.id).to.equal(1)
        expect(data.name).to.equal('new')
        done()
      })
  })

  it('should get 404 on /products/2 GET', function (done) {
    request(app)
      .get('/api/v1/products/2')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        done(err)
      })
  })

  it('should delete a SINGLE product on /products/1 DELETE', function (done) {
    request(app)
      .delete('/api/v1/products/1')
      .expect(204)
      .end(function (err, res) {
        expect(err).to.be.null
        done()
      })
  })

  it('should get 404 on /products/1 DELETE again', function (done) {
    request(app)
      .delete('/api/v1/products/1')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        done(err)
      })
  })

  it('should get an AppError on /products/1/valid GET', function (done) {
    request(app)
      .get('/api/v1/products/1/valid')
      .type('json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        checkErrorResponse(res.text, 'AppError')
        done(err)
      })
  })
  it('should get an Error on /products/11/valid GET', function (done) {
    request(app)
      .get('/api/v1/products/11/valid')
      .type('json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        checkErrorResponse(res.text, 'Error')
        done(err)
      })
  })

  it('should get 400 on /products/aaa/valid GET', function (done) {
    request(app)
      .get('/api/v1/products/aaa/valid')
      .type('json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        checkErrorResponse(res.text, 'Error')
        done(err)
      })
  })

  it('should get { valid: boolean } on /products/2/valid GET', function (done) {
    request(app)
      .get('/api/v1/products/2/valid')
      .type('json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        const data = JSON.parse(res.text)
        expect(err).to.be.null
        expect(data.valid).a('boolean')
        done()
      })
  })

  it('should get an Error on /products/3/valid GET', function (done) {
    request(app)
      .get('/api/v1/products/3/valid')
      .type('json')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function (err, res) {
        checkErrorResponse(res.text, 'Error')
        done(err)
      })
  })
})
