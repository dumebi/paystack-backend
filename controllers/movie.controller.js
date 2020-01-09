const CommentModel = require('../models/comment.model');
const HttpStatus = require('http-status-codes');
const { handleError, handleSuccess } = require('../helpers/utils');
const { getCharacters, getFilms, getComments, addMetadata, processCharacters } = require('../services/movie.service')
const { getAsync } = require('../helpers/redis');
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
      let movies = {}
      const result = await getAsync('starwars_movies');
      if (result != null && JSON.parse(result).length > 0) {
        movies = JSON.parse(result);
      } else {
        movies = await getFilms();
        movies = await getComments(movies);
      }
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
        let characters = {}
        const result = await getAsync('starwars_characters');
        if (result != null && JSON.parse(result).length > 0) {
          characters = JSON.parse(result);
         } else {
          characters = await getCharacters(req.query)
          // add to cache
          await publisher.queue('ADD_TO_CACHE', { object: characters, key: 'starwars_characters' })
        }
        characters = await processCharacters(characters, req.query);
        characters = await addMetadata(characters);
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
