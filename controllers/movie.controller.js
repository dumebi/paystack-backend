const CommentModel = require('../models/comment.model');
const HttpStatus = require('http-status-codes');
const axios = require('../helpers/axios')
const { handleError, handleSuccess } = require('../helpers/utils');
const publisher = require('../helpers/rabbitmq');

const MovieController = {

  /**
   * Get Users.
   * @description This returns all users in the Premier League Ecosystem.
   * @return {object[]} users
   */
  async all(req, res, next) {
    try {
      const comments = await CommentModel.findAll({})
      return handleSuccess(res, HttpStatus.OK, 'Users retrieved', comments)
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Could not get users', error)
    }
  },

  /**
     * Get User
     * @description This gets a user from the STTP Ecosystem based off ID
     * @param   {string}  id  User's ID
     * @return  {object}  user
     */
  async films(req, res, next) {
    try {
      const movie_response = axios.get('films/');
      const movies = movie_response.data.map((movie) => {
        console.log(movie)
      });
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Could not get users', error)
    }
  },

  /**
   * Update User
   * @description This returns the transactions on all wallets of a user
   * @param {string} username     Username
   * @return {object} user
   */
  async update(req, res, next) {
    try {
      if (paramsNotValid(req.params.id)) {
        return handleError(res, HttpStatus.PRECONDITION_FAILED, paramsNotValidChecker(req.params.id), null)
      }
      const _id = req.params.id;
      delete req.body.password
      delete req.body.token
      delete req.body.recover_token
      const user = await UserModel.findByIdAndUpdate(
        _id,
        { $set: req.body },
        { safe: true, multi: true, new: true }
      )
      if (user) {
        const newUser = UserController.deepCopy(user)
        await Promise.all([publisher.queue('ADD_OR_UPDATE_USER_PREMIER_CACHE', { newUser })])
        return handleSuccess(res, HttpStatus.OK, 'User has been updated', newUser)
      }
      return handleError(res, HttpStatus.NOT_FOUND, 'User not found', null)
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Error updating user', error)
    }
  },

  /**
   * Redis Cache User
   * @description Add or Update redis user caching
   * @param user User object
   */
  async addOrUpdateCache(object, key) {
    try {
      // console.log(user)
      const premierObject = await getAsync(key);
      if (premierObject != null && JSON.parse(premierObject).length > 0) {
        const objects = JSON.parse(premierObject);
        objects[object._id] = object
        await client.set(key, JSON.stringify(objects));
      }
    } catch (err) {
      console.log(err)
    }
  },

  /**
   * Deep Copy
   * @description copy mongo object into a user object
   * @param user User object
   */
  deepCopy(user) {
    try {
      let newUser = JSON.stringify(user)
      newUser = JSON.parse(newUser)
      delete newUser.password;
      return newUser;
    } catch (err) {
      console.log(err)
    }
  }
};

module.exports = MovieController;
