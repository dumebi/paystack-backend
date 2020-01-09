const { sequelize } = require('../helpers/sequelize')
const Sequelize = require('sequelize');

const Comment = sequelize.define('comment', {
  episode_id: { type: Sequelize.INTEGER, allowNull: false },
  ip_address: { type: Sequelize.STRING, allowNull: false },
  comment: { type: Sequelize.STRING(500), allowNull: true },
});


module.exports = Comment