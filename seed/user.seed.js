const R = require('ramda')
const nf = require('ng-faker')
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')
const { UserType } = require('../helpers/enum')

const constructUser = () => ({
  username: nf.name.firstName(),
  email: `${nf.name.lastName()}@gmail.com`,
  type: UserType.USER,
  password: bcrypt.hashSync(
    nf.random.alphanumeric(10),
    bcrypt.genSaltSync(5),
    null
  )
})

const users = R.times(constructUser, 5)

const adminUser = {
  username: 'proton',
  email: 'coop@proton.com',
  type: UserType.ADMIN,
  password: bcrypt.hashSync(
    'am_i_a_yahoo_boy',
    bcrypt.genSaltSync(5),
    null
  )
}

const seedUsers = [adminUser, ...users]
const options = { ordered: false }

module.exports = () => User.collection.insertMany(seedUsers, options)
