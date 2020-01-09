/* eslint-disable no-undef */
const sequelize = require('../helpers/sequelize')
const http_status = require('http-status-codes')
const expect = require('chai').expect
const supertest = require('supertest')
require('dotenv').config();
const { config } = require('../helpers/utils');

const api = supertest(`${config.host}`)
console.log(`${config.host}`)
let movie_id = ''

describe('Movie Successful Test', () => {
  it('Should Get all films and comment counts', (done) => {
    api
      .get('films')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Movies retrieved successfully')
        expect(res.body.data).to.have.lengthOf.above(0)
        movie_id = res.body.data[0].episode_id
        done()
      })
  }).timeout(30000)

  it('Should Add a comment to a movie', (done) => {
    api
      .post(`films/${movie_id}/comments`)
      .set('Accept', 'application/json')
      .send({
        comment: 'thius film make danu'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Comment added successfully')
        expect(res.body.data).to.equal(null)
        done()
      })
  }).timeout(30000)

  it('Should Get comments on a movie', (done) => {
    api
      .get(`films/${movie_id}/comments`)
      .set('Accept', 'application/json')
      .send({
        comment: 'thius film make danu'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Comments gotten successfully')
        expect(res.body.data).to.have.lengthOf.above(0)
        done()
      })
  }).timeout(30000)

  it('Should Get all characters', (done) => {
    api
      .get(`characters`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Characters retrieved successfully')
        expect(res.body.data.characters).to.have.lengthOf.above(0)
        expect(res.body.data.metadata)
        done()
      })
  }).timeout(30000)

  it('Should Get all characters filtered by gender', (done) => {
    api
      .get(`characters?filter=male`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Characters retrieved successfully')
        expect(res.body.data.characters).to.have.lengthOf.above(0)
        expect(res.body.data.metadata)
        done()
      })
  }).timeout(30000)

  it('Should Get all characters ordered', (done) => {
    api
      .get(`characters?order=desc&sort=gender`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('Characters retrieved successfully')
        expect(res.body.data.characters).to.have.lengthOf.above(0)
        expect(res.body.data.metadata)
        done()
      })
  }).timeout(30000)
})



describe('Movie Failed Test', () => {
  it('Should fail to add comment, if comment object isnt passed', (done) => {
    api
      .post(`films/${movie_id}/comments`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to add comment, without proper movie ID passed', (done) => {
    api
      .post(`films/here/comments`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to get comment, without movie ID passed', (done) => {
    api
      .post(`films/here/comments`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to get characters if gender is not {male, female}', (done) => {
    api
      .get(`characters?filter=boy`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to get characters if order is not {asc, desc, ascending, descending}', (done) => {
    api
      .get(`characters?order=up`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)

  it('Should fail to get characters if sort is not {name, gender, height}', (done) => {
    api
      .get(`characters?order=up`)
      .set('Accept', 'application/json')
      .expect(http_status.PRECONDITION_FAILED)
      .end((err, res) => {
        expect(res.body.status).to.equal('failed')
        done()
      })
  }).timeout(30000)
})