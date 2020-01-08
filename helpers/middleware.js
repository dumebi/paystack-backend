// Import lbraries
const UserModel = require('../models/user.model');
const HttpStatus = require('./status')
require('dotenv').config();
const {
  checkToken, handleError
} = require('../helpers/utils')
const logger = require('./logger')

/**
 * Express Middleware that logs incoming HTTP requests.
 */
exports.logRequest = (req, res, next) => {
  logger.logAPIRequest(req);
  next();
};

/**
 * Check Query originates from resource with at user rights
 */
exports.isUser = async (req, res, next) => {
  try {
    const token = await checkToken(req);
    if (token.status === 'failed') {
        return handleError(res, token.data, token.message, null)
      }
    if (token.data.type === Object.values(UserModel.UserType)[0]
      || token.data.type === Object.values(UserModel.UserType)[1]
    ) {
      req.jwtUser = token.data.id
      next()
    } else {
      return handleError(res, HttpStatus.UNAUTHORIZED, 'Access not granted to this resource.', null)
    }
  } catch (err) {
    return handleError(res, HttpStatus.UNAUTHORIZED, 'Failed to authenticate token.', err)
  }
}

/**
 * Check Query originates from resource with admin rights
 */
exports.isAdmin = async (req, res, next) => {
  try {
    const token = await checkToken(req);
    if (token.status === 'failed') {
      return handleError(res, token.data, token.message, null)
    }
    if (
      token.data.type === Object.values(UserModel.UserType)[1]
    ) {
      req.jwtUser = token.data.id
      next()
    } else {
      return handleError(res, HttpStatus.UNAUTHORIZED, 'Access not granted to this resource.', null)
    }
  } catch (err) {
    return handleError(res, HttpStatus.UNAUTHORIZED, 'Failed to authenticate token.', err)
  }
}

