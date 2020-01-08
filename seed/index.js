const userSeed = require('./user.seed')
const User = require('../models/user.model')


async function seedApp() {
  try {
    await Promise.all([userSeed])
  } catch {
    console.log('Error Seeding Data')
  }
}

seedApp()
