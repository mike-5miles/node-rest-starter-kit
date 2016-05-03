import request from 'supertest'
import chai from 'chai'

import app from '../../src/server'
import { AdPlans, AdPlanCities, Items, Users } from '../../src/models'

const expect = chai.expect

const params = {
  country: 'United States',
  region: 'TX',
  city: 'Addison',
  category_id: 1
}

const adPlan = {
  id: 1, fuzzy_id: '1', ad_type: 1, state: 2, owner_id: 1,
  category_id: params.category_id,
  item_id: 1,
  item: {
    id: 1,
    owner_id: 1,
    title: 'item',
    state: 0
  },
  cities: [{
    ad_plan_id: 1,
    region: params.region,
    city: params.city,
    begin_time: 111,
    end_time: 222
  }, {
    ad_plan_id: 1,
    region: params.region,
    city: params.city,
    begin_time: 333,
    end_time: 444
  }]
}

describe('API: GET /ad_plans/featured/history: ', function () {
  const featuredHistoryUrl = '/api/v1/ad_plans/featured/history'

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
        .get(featuredHistoryUrl)
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          expect(err).to.be.null
          done()
        })
    })
    it('return error 500 if invalid user in header', function (done) {
      request(app)
        .get(featuredHistoryUrl)
        .set('X-FIVEMILES-USER-ID', 'invalid')
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
    it('should return empty array if nothing in db', function (done) {
      request(app)
        .get(featuredHistoryUrl)
        .set('X-FIVEMILES-USER-ID', 'ABCDE')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.meta.total_count).to.equal(0)
          expect(data.meta.next).to.be.null
          expect(data.meta.previous).to.be.null
          expect(data.objects).to.be.empty
          expect(err).to.be.null
          done()
        })
    })
    describe('if something in db', function () {
      before(function (done) {
        (async function () {
          await AdPlans.create(adPlan)
          await AdPlanCities.bulkCreate(adPlan.cities)
          await Items.upsert(adPlan.item)
          done()
        })()
      })

      it('should return results', function (done) {
        request(app)
          .get(featuredHistoryUrl)
          .set('X-FIVEMILES-USER-ID', 'ABCDE')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            const data = JSON.parse(res.text)
            expect(data.meta.total_count).to.equal(1)
            expect(data.meta.next).to.be.null
            expect(data.meta.previous).to.be.null
            expect(data.objects.length).to.equal(1)
            expect(err).to.be.null
            done()
          })
      })
    })
  })
})

describe('API: GET /ad_plans/featured/{id}/valid: ', function () {
  const validUrl = '/api/v1/ad_plans/featured/{id}/valid'

  before(function (done) {
    (async function () {
      await Items.destroy({ truncate: true })
      await AdPlanCities.destroy({ truncate: true })
      await AdPlans.destroy({ truncate: true })
      adPlan.state = 1
      await AdPlans.create(adPlan)
      await AdPlanCities.bulkCreate(adPlan.cities)
      await Items.upsert(adPlan.item)
      done()
    })()
  })

  it('return 404 if id not found', function (done) {
    request(app)
      .get(validUrl.replace('{id}', 111))
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function (err, res) {
        expect(err).to.be.null
        done()
      })
  })

  it('return 200 if valid', function (done) {
    request(app)
      .get(validUrl.replace('{id}', 1))
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(err).to.be.null
        const data = JSON.parse(res.text)
        expect(data.valid, true)
        done()
      })
  })

  describe('if ad plan is not pending', function (done) {
    before(function (done) {
      (async function () {
        await AdPlans.update(
          { state: 11 },
          { where: { id: 1 } })
        done()
      })()
    })
    after(function (done) {
      (async function () {
        await AdPlans.update(
          { state: 1 },
          { where: { id: 1 } })
        done()
      })()
    })

    it('return FEATURED_PLAN_NOT_PENDING', function (done) {
      request(app)
        .get(validUrl.replace('{id}', 1))
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.error.code).to.equal('AppError: FEATURED_PLAN_NOT_PENDING')
          expect(err).to.be.null
          done()
        })
    })
  })
  describe('if item is not listing', function (done) {
    before(function (done) {
      (async function () {
        await Items.update(
          { state: 11 },
          { where: { id: 1 } })
        done()
      })()
    })
    after(function (done) {
      (async function () {
        await Items.upsert(adPlan.item)
        done()
      })()
    })

    it('return FEATURED_LISTING_CHECK_FAILED', function (done) {
      request(app)
        .get(validUrl.replace('{id}', 1))
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.error.code).to.equal('AppError: FEATURED_LISTING_CHECK_FAILED')
          expect(err).to.be.null
          done()
        })
    })
  })

  describe('if city end time conflict', function (done) {
    before(function (done) {
      (async function () {
        adPlan.id = 2
        adPlan.fuzzy_id = '2'
        adPlan.state = 2
        await AdPlans.create(adPlan)
        adPlan.cities.forEach((o) => { o.ad_plan_id = 2 })
        await AdPlanCities.bulkCreate(adPlan.cities)
        done()
      })()
    })

    it('return FEATURED_CITY_CHECK_FAILED', function (done) {
      request(app)
        .get(validUrl.replace('{id}', 1))
        .expect('Content-Type', /json/)
        .expect(500)
        .end(function (err, res) {
          const data = JSON.parse(res.text)
          expect(data.error.code).to.equal('AppError: FEATURED_CITY_CHECK_FAILED')
          expect(err).to.be.null
          done()
        })
    })
  })
})
