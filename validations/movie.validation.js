const Joi = require('@hapi/joi');
const HttpStatus = require('http-status-codes');
const {
  handleError
} = require('../helpers/utils');

exports.validate_add_comment = async (req, res, next) => {
  try {
    console.log(req.body)
    const schema = Joi.object().keys({
      comment: Joi.string().required().max(500).label('Movie Comment'),
    })
    const schemaVal = await Joi.validate(req.body, schema);
    if (schemaVal.error) throw schemaVal.error
    next()
  } catch (error) {
    return handleError(res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

exports.validate_movie_id = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      id: Joi.number().required().label('Movie ID'),
    })
    await Joi.validate(req.params, schema);
    next()
  } catch (error) {
    return handleError(res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}

exports.validate_character_requests = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      filter: Joi.string().valid('male', 'female').label('Filter'),
      sort: Joi.string().valid('name', 'gender', 'height').label('Sort'),
      order: Joi.string().valid('asc', 'desc', 'ascending', 'descending').label('Order'),
    })
    await Joi.validate(req.query, schema);
    next()
  } catch (error) {
    return handleError(res, HttpStatus.PRECONDITION_FAILED, error.details[0].message, null)
  }
}
