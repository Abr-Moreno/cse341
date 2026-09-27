// MAIN IDEA:
// ==========
// What to do with specific requests, what HTTP respond to send?
// ============================================

// Import contact data access functions from the contacts model.
const contactsModel = require('../models/contacts');

const getData = async (req, res, next) => {
  try {
    // Retrieve all contacts.
    const data = await contactsModel.getContacts();

    // Send the contacts with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getDataById = async (req, res, next) => {
  try {
    // Extract the ID from the URL parameters
    const id = req.params.id;
    // Retrieve the contact matching the requested ID.
    const data = await contactsModel.getContactById(id);

    // Send the contact with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


// Export functions for all and single contact retrieval.
module.exports = {
  getData,
  getDataById,
};