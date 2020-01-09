const Sequelize = require('sequelize');
const utils = require('../helpers/utils');
const sequelize = new Sequelize(utils.config.postgres);
async function db(){
  sequelize
    .authenticate()
    .then(async () => {
      sequelize.sync({force: true})
      console.log('Sequelize is connected.');
      // await sequelize.query(`CREATE DATABASE ${process.env.POSTGRES_DBNAME};`)
    })
    .catch(err => {
      console.log(err)
      console.error('Sequelize connection unsuccessful, retry after 5 seconds.');
      setTimeout(db, 5000)
    });
};

db();

exports.sequelize = sequelize;