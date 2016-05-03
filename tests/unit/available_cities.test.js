import request from 'supertest'
import fetchMock from 'fetch-mock'
import mockery from 'mockery'
import chai from 'chai'

import app from '../../src/server'
import config from '../../config'
import { AvailableCities, AdPlans, AdPlanCities } from '../../src/models'

const expect = chai.expect

const params = {
  country: 'United States',
  region: 'TX',
  city: 'Addison',
  city_id: 1,
  category_id: 1
}

const adPlan = {
  id: 1, ad_type: 1, state: 2, owner_id: 1,
  category_id: params.category_id,
  item_id: 1,
  item: {
    id: 1,
    owner_id: 1,
    title: 'item'
  },
  cities: [{
    ad_plan_id: 1,
    region: params.region,
    city: params.city,
    city_id: params.city_id,
    begin_time: 111,
    end_time: 222
  }, {
    ad_plan_id: 1,
    region: params.region,
    city: params.city,
    city_id: params.city_id,
    begin_time: 333,
    end_time: 444
  }]
}

describe('API: GET /ad_plans/featured/avaliable_cities: ', function () {
  const availableCitiesUrl = '/api/v1/ad_plans/featured/avaliable_cities' +
        `?country=${params.country}&region=${params.region}&city=${params.city}&category=${params.category_id}`

  const cityApiUrl = config.api.bi.basePath + '/citys/'
  const citiesFromApi = {
    citys: [
      {
        city: 'Addison',
        region: 'TX',
        id: 1
      },
      {
        city: 'Aledo',
        region: 'TX',
        id: 2
      },
      {
        city: 'Allen',
        region: 'TX',
        id: 3
      }
    ]
  }
  const citiesInDb = [{
    region: params.region,
    city: params.city,
    related_region: params.region,
    related_city: params.city
  }]
  const expectEmpty = function (done) {
    request(app)
      .get(availableCitiesUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(fetchMock.called(cityApiUrl)).to.be.true
        const data = JSON.parse(res.text)
        expect(data).to.be.empty
        expect(err).to.be.null
        done()
      })
  }

  const expectCities = function (apiCalled, countCity, endTime, done) {
    request(app)
      .get(availableCitiesUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        expect(fetchMock.called(cityApiUrl)).to.equal(apiCalled)
        const data = JSON.parse(res.text)
        expect(data.length).to.equal(countCity)
        expect(data[0].end_time).to.equal(endTime)
        expect(err).to.be.null
        done()
      })
  }

  before(function (done) {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    mockery.registerMock('node-fetch', fetchMock.fetchMock)
    done()
  })
  after(function (done) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
    done()
  })
  beforeEach(function (done) {
    (async function () {
      await AvailableCities.destroy({ truncate: true })
      await AdPlanCities.destroy({ truncate: true })
      await AdPlans.destroy({ truncate: true })
      done()
    })()
  })
  afterEach(function (done) {
    fetchMock.restore()
    done()
  })

  describe('if no available cities in local db', function () {
    it('should call api, return empty array, if empty array returned from bi api', function (done) {
      fetchMock.mock(cityApiUrl, { citys: [] })
      expectEmpty(done)
    })

    it('should call api, return empty array, if error returned from bi api', function (done) {
      fetchMock.mock(cityApiUrl, 500)
      expectEmpty(done)
    })

    it('should call api, return empty array, if bad format returned from bi api', function (done) {
      fetchMock.mock(cityApiUrl, 'whatever')
      expectEmpty(done)
    })

    describe('if something returned from bi api', function () {
      describe('if no related ad_plan', function () {
        it('should call api, return cities with end_time=null', function (done) {
          fetchMock.mock(cityApiUrl, citiesFromApi)
          expectCities(true, citiesFromApi.citys.length, null, done)
        })
      })
      describe('if has related ad_plan', function () {
        beforeEach(function (done) {
          (async function () {
            await AdPlans.create(adPlan)
            await AdPlanCities.bulkCreate(adPlan.cities)
            done()
          })()
        })
        it('should call api, return cities with end_time', function (done) {
          fetchMock.mock(cityApiUrl, citiesFromApi)
          expectCities(true, citiesFromApi.citys.length, adPlan.cities[1].end_time, done)
        })
      })
    })
  })

  describe('if available cities already in local db', function () {
    beforeEach(function (done) {
      (async function () {
        await AvailableCities.bulkCreate(citiesInDb)
        done()
      })()
    })
    describe('if no related ad_plan', function () {
      it('won\'t call api, return cities with end_time=null', function (done) {
        expectCities(false, citiesInDb.length, null, done)
      })
    })
    describe('if has related ad_plan', function () {
      beforeEach(function (done) {
        (async function () {
          await AdPlans.create(adPlan)
          await AdPlanCities.bulkCreate(adPlan.cities)
          done()
        })()
      })
      it('won\'t call api, return cities with end_time', function (done) {
        expectCities(false, citiesInDb.length, adPlan.cities[1].end_time, done)
      })
    })
  })
})

