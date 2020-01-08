const axios = require('axios')
const instance = axios.create({
  baseURL: 'https://swapi.co/api/',
  headers: {'Content-Type': 'application/json'},
  timeout: 30000
});

module.exports = instance