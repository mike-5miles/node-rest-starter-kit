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
          done(err)
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
          done(err)
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
          console.log(data)
          // expect(data.meta.total_count).to.equal(0)
          // expect(data.meta.next).to.be.null
          // expect(data.meta.previous).to.be.null
          // expect(data.objects).to.be.empty
          done(err)
        })
    })
  })
})
