const utils = require('../helpers/utils');
const RabbitMQ = require('./rabbitmq')
const subscriber = require('./rabbitmq')

const { addToCache } = require('../services/movie.service');
require('dotenv').config();

module.exports = {
  async rabbitmq() {
    try {
      RabbitMQ.init(utils.config.amqp_url);
    } catch (error) {
      console.log(error)
    }
  },
  async subscribe() {
    try {
      await subscriber.init(utils.config.amqp_url);
    // Add to redis cache
      subscriber.consume('ADD_TO_CACHE', (msg) => {
        const data = JSON.parse(msg.content.toString());
        addToCache(data.object, data.key)
        subscriber.acknowledgeMessage(msg);
      }, 3);
    } catch (error) {
      console.log(error)
    }
  },
}
