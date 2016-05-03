import request from 'supertest'
import chai from 'chai'

import app from '../../src/server'
import { AdPlans, AdPlanCities, Items, Users } from '../../src/models'

const expect = chai.expect

const adPlan = {
  'title': 'string',
  'ad_type': 1,
  'ad_scope': 2,
  'item': {
    'id': 1,
    'fuzzy_id': 'string',
    'root_category_id': 0,
    'category_id': 0,
    'title': 'string'
  },
  'duration': 0,
  'begin_time': 1451577600000,
  'end_time': 4070880000000,
  'price': 0,
  'cities': [
    {
      'region': 'string',
      'city': 'string',
      'city_id': 11,
      'begin_time': 1451577600000,
      'end_time': 4070880000000
    }
  ],
  'state': 1
}

describe('API: POST /ad_plans: ', function () {
  const adPlanUrl = '/api/v1/ad_plans'
  before(function (done) {
    (async function () {
      await Items.destroy({ truncate: true })
      await AdPlanCities.destroy({ truncate: true })
      await AdPlans.destroy({ truncate: true })
      await Users.destroy({ truncate: true })
      await Users.create({id: 1, fuzzy_id: 'ABCDE'})
      done()
    })()
  })

  describe('if no valid user in header', function () {
    it('return error 400 if no header', function (done) {
      request(app)
        .post(adPlanUrl)
        .type('json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          expect(err).to.be.null
          done()
        })
    })
    it('return error 500 if invalid user in header', function (done) {
      request(app)
        .post(adPlanUrl)
        .type('json')
        .set('X-FIVEMILES-USER-ID', 'invalid')
        .send(adPlan)
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.error.code).to.equal('AppError: INVALID_USER')
          expect(err).to.be.null
          done()
        })
    })
  })

  describe('if valid user in header', function () {
    it('should return 201', function (done) {
      request(app)
        .post(adPlanUrl)
        .type('json')
        .send(adPlan)
        .set('X-FIVEMILES-USER-ID', 'ABCDE')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.id).to.equal(1)
          expect(err).to.be.null
          done()
        })
    })
  })
})

describe('API: POST /ad_plans/{id}/pay: ', function () {
  const payUrl = '/api/v1/ad_plans/{id}/pay'

  it('return 404 if id not found', function (done) {
    request(app)
      .post(payUrl.replace('{id}', 111))
      .type('json')
      .send({
        order_number: 'order1',
        state: 2})
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        expect(err).to.be.null
        done()
      })
  })

  it('return 204 if fulfilled successfully', function (done) {
    request(app)
      .post(payUrl.replace('{id}', 1))
      .type('json')
      .send({
        order_number: 'order1',
        state: 2})
      .expect(204)
      .end(function (err, res) {
        expect(err).to.be.null
        done()
      })
  })
})
