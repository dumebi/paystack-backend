/* eslint-disable no-undef */
const mongoose = require('mongoose');
const expect = require('chai').expect
const supertest = require('supertest')
const http = require('http');
const app = require('../server')
require('dotenv').config();
const { config } = require('../helpers/utils');

const UserModel = require('../models/user');

const api = supertest(`${config.host}`)
console.log(`${config.host}`)

describe('Admin Test', () => {
  let user_id = ''
  let user2_id = ''

  before(async () => {
    // const port = process.env.PORT || 8080;
    // app.set('port', port);
    // /**
    //  * Create HTTP server.
    //  */
    // const server = http.createServer(app);
    // /**
    //  * Listen on provided port, on all network interfaces.
    //  */
    // server.listen(port);
    console.log(config.mongo);
    // this.timeout(13000); // A very long environment setup.
    // await setTimeout(done, 20000);
    await mongoose.connect(config.mongo, { useNewUrlParser: true });
    await mongoose.connection.db.dropDatabase();
    // await dbSeeder();
  })
  // it('Should create a user', (done) => {
  //   const username = 'oneguylykdat'
  //   const email = 'email@mail.com'
  //   const password = 'John'
  //   api
  //     .post('users/signup')
  //     .set('Accept', 'application/json')
  //     .send({
  //       username,
  //       email,
  //       password
  //     })
  //     .expect(200)
  //     .end((err, res) => {
  //       console.log()
  //       expect(res.body.status).to.equal('success')
  //       expect(res.body.data._id).to.have.lengthOf.above(0)
  //       expect(res.body.data.email).to.equal(email)
  //       expect(res.body.data.username).to.equal(username)
  //       expect(res.body.data.password).to.not.equal(password)
  //       admin_id = res.body.data._id
  //       admin_jwt = res.body.data.token
  //       done()
  //     })
  // }).timeout(30000)
})

