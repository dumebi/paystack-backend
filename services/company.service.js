const Company = require('../models/company.model');

exports.createCompany = async (name) => {
  try {
    const newCompany = new Company({ name });
    await newCompany.save();
    return newCompany;
  } catch (error) {
    throw new Error(error.message);
  };
};

exports.getAllCompanies = async (page) => {
  try {
    const pageQuery = parseInt(page) || 1;
    const options = {
      page: pageQuery,
      limit: 10,
      collation: {
        locale: 'en'
      }
    };

    const getCompanies = await Company.paginate({}, options);
    const data = {
      page: getCompanies.page,
      pages: getCompanies.totalPages,
      count: getCompanies.totalDocs,
      companies: getCompanies.docs
    };
    return data;
  } catch (error) {
    throw new Error(error.message);
  };
};

exports.getCompanyById = async (id) => {
  try {
    const company = await Company.findById(id);
    return company;
  } catch (error) {
    throw new Error(error.message);
  };
};