const ReviewType = require('../models/reviewType.model');

exports.createReviewType = async (reviewType) => {
  try {
    const newType = new ReviewType({ reviewType });
    await newType.save();
    return newType;
  } catch (error) {
    throw new Error(error.message);
  };
};

exports.allReviewTypes = async () => {
  try {
    const getReviewTypes = await ReviewType.find();
    return getReviewTypes;
  } catch (error) {
    throw new Error(error.message);
  }
}