const Review = require('../models/review.model');

exports.createReview = async (position, description, reviewType, level, salary, rating, company) => {
  try {
    const newReview = new Review({
      position, description, reviewType, level, salary, rating, company
    });
    await newReview.save();
    return newReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getReviewByCompanyId = async (id, page) => {
  try {
    const pageQuery = parseInt(page) || 1;
    const options = {
      page: pageQuery,
      limit: 10,
      collation: {
        locale: 'en'
      }
    };

    const getReviews = await Review.paginate({ company: id }, options);

    const data = {
      page: getReviews.page,
      pages: getReviews.totalPages,
      count: getReviews.totalDocs,
      reviews: getReviews.docs
    };
    return data;
  } catch (error) {
    throw new Error(error.message);
  };
};