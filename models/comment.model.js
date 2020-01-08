const { sequelize } = require('../helpers/sequelize')
const Sequelize = require('sequelize');

const Comment = sequelize.define('comment', {
  movie: { type: Sequelize.STRING, allowNull: false },
  ip_address: { type: Sequelize.STRING, allowNull: false },
  comment: { type: Sequelize.STRING, allowNull: true },
});


module.exports = Comment