// const Constants = require('./status')
// const UserModel = require('../models/user.model');
require('dotenv').config();

exports.config = {
  jwt: process.env.JWT_SECRET,
  postgres: '',
  host: '',
  amqp_url: '',
  port: '',
  redis: ''
}

if (process.env.NODE_ENV === 'development') {
  this.config.postgres = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DBNAME}`
  this.config.host = `http://localhost:${process.env.PORT}/v1/`
  this.config.amqp_url = `${process.env.AMQP_URL}`
  this.config.port = `${process.env.PORT}`
} else {
  this.config.postgres = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DBNAME}`
  this.config.host = `https://damp-thicket-34433.herokuapp.com/v1/`
  this.config.amqp_url = `${process.env.CLOUDAMQP_URL}`
  this.config.port = `${process.env.PORT}`
  this.config.redis = `${process.env.REDIS_URL}`
}

exports.handleError = (res, code, message, err) => {
  console.log(message, err)
  return res.status(parseInt(code, 10)).json({
    status: 'failed',
    message
  })
}

exports.handleSuccess = (res, code, message, data) => {
  return res.status(parseInt(code, 10)).json({
    status: 'success',
    message,
    data
  })
}
