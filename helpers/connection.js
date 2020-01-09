const mongoose = require('mongoose');
const utils = require('../utils/utils');
const RabbitMQ = require('./rabbitmq')
const subscriber = require('./rabbitmq')

const { addOrUpdateCache } = require('../controllers/user');
const { sendUserToken, sendUserSignupEmail, sendQuestionAnsweredEmail } = require('../utils/emails');
const { sendMail } = require('../utils/utils');
require('dotenv').config();

// Socket config
module.exports = {
  async rabbitmq() {
    RabbitMQ.init(utils.config.amqp_url);
  },
  async subscribe() {
    await subscriber.init(utils.config.amqp_url);
    // Add to redis cache
    subscriber.consume('ADD_OR_UPDATE_USER_STACKOVERFLOW_CACHE', (msg) => {
      const data = JSON.parse(msg.content.toString());
      addOrUpdateCache(data.newUser, 'stackoverflow__users')
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // Send User Signup Mail
    subscriber.consume('SEND_USER_STACKOVERFLOW_SIGNUP_EMAIL', (msg) => {
      const data = JSON.parse(msg.content.toString());
      const userTokenMailBody = sendUserSignupEmail(data.user)
      const mailparams = {
        email: data.user.email,
        body: userTokenMailBody,
        subject: 'Activate your account'
      };
      sendMail(mailparams, (error, result) => {
        console.log(error)
        console.log(result)
      });
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // Send User Token Mail
    subscriber.consume('SEND_USER_STACKOVERFLOW_TOKEN_EMAIL', (msg) => {
      const data = JSON.parse(msg.content.toString());
      const userTokenMailBody = sendUserToken(data.user, data.token)
      const mailparams = {
        email: data.user.email,
        body: userTokenMailBody,
        subject: 'Recover your password'
      };
      sendMail(mailparams, (error, result) => {
        console.log(error)
        console.log(result)
      });
      subscriber.acknowledgeMessage(msg);
    }, 3);

    // Send Subscribers Question Answered Mail
    subscriber.consume('SEND_USER_STACKOVERFLOW_QUESTION_SUB_EMAIL', (msg) => {
      const data = JSON.parse(msg.content.toString());
      const userQuestionAnsweredBody = sendQuestionAnsweredEmail(data.question)
      const mailparams = {
        email: data.email,
        body: userQuestionAnsweredBody,
        subject: 'Question subscription'
      };
      sendMail(mailparams, (error, result) => {
        console.log(error)
        console.log(result)
      });
      subscriber.acknowledgeMessage(msg);
    }, 3);
  },
}
