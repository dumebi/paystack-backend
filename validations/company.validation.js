const Joi = require('@hapi/joi');

exports.validateCompany = (company) => {
  const schema = {
    name: Joi.string()
      .required()
  };

  return Joi.validate(company, schema);
};
