// Retrieve module responsible for interacting with the database
const professionalModel = require('../models/professional');

const getData = async (req, res, next) => {
  try {
    // Asks the model for the professional data from the database
    const data = await professionalModel.getProfessional();

    // If successful, respond w/ 200 status code and the retrieved data in JSON format
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getData,
};