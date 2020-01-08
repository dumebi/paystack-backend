const Position = require('../models/position.model');

exports.createPosition = async (position) => {
  try {
    const newPosition = new Position({ position });
    await newPosition.save();
    return newPosition;
  } catch (error) {
    throw new Error(error.message);
  };
};

exports.getAllPositions = async () => {
  try {
    const positions = await Position.find();
    return positions;
  } catch (error) {
    throw new Error(error.message);
  };
};