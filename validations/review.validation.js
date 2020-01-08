const Joi = require('@hapi/joi');

exports.validateReview = (review) => {
  const schema = {
    position: Joi.string()
      .alphanum()
      .required(),
    description: Joi.string()
      .required(),
    reviewType: Joi.string()
      .alphanum()
      .required(),
    level: Joi.string()
      .required(),
    salary: Joi.number()
      .min(1)
      .required(),
    rating: Joi.number()
      .min(1)
      .max(5)
      .required(),
    company: Joi.string()
      .alphanum()
      .required(),
  };

  return Joi.validate(review, schema);
};