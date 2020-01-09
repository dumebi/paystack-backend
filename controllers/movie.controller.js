const CommentModel = require('../models/comment.model');
const HttpStatus = require('http-status-codes');
const { handleError, handleSuccess } = require('../helpers/utils');
const { getCharacters } = require('../services/movie.service')
const publisher = require('../helpers/rabbitmq');

const MovieController = {
  /**
     * Get User
     * @description This gets a user from the STTP Ecosystem based off ID
     * @param   {string}  id  User's ID
     * @return  {object}  user
     */
  async films(req, res, next) {
    try {
      
      return handleSuccess(res, HttpStatus.OK, 'Movies retrieved successfully', movies)
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Error getting movies', error)
    }
  },


  /**
     * Get User
     * @description This gets a user from the STTP Ecosystem based off ID
     * @param   {string}  id  User's ID
     * @return  {object}  user
     */
    async characters(req, res, next) {
      try {
        const characters = await getCharacters(req.query)
        return handleSuccess(res, HttpStatus.OK, 'Characters retrieved successfully', characters)
      } catch (error) {
        return handleError(res, HttpStatus.BAD_REQUEST, 'Error getting characters', error)
      }
    },

  /**
   * Update User
   * @description This returns the transactions on all wallets of a user
   * @param {string} username     Username
   * @return {object} user
   */
  async addComment(req, res, next) {
    try {
      let ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
      CommentModel.create({ episode_id: req.params.id, ip_address: ip, comment: req.body.comment })
      return handleSuccess(res, HttpStatus.OK, 'Comment added successfully', null)
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Error adding comment', error)
    }
  },

  /**
   * Update User
   * @description This returns the transactions on all wallets of a user
   * @param {string} username     Username
   * @return {object} user
   */
  async comments(req, res, next) {
    try {
      comments = await CommentModel.findAll({
        where: {
          episode_id: req.params.id
        },
        order: [
          ['createdAt', 'DESC'],
        ]
      })
      return handleSuccess(res, HttpStatus.OK, 'Comments gotten successfully', comments)
    } catch (error) {
      return handleError(res, HttpStatus.BAD_REQUEST, 'Error getting commments', error)
    }
  },
};

module.exports = MovieController;
