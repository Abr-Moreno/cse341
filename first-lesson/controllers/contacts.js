// MAIN IDEA:
// ==========
// Controller is the traffic coordinator between HTTP and app's data layer.============================================

// Import contact data access functions from the contacts model.
const contactsModel = require('../models/contacts');

// GET all contacts
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

// GET a single contact by ID
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

// POST - create a new contact
// Receives HTTP request, validates it, and turns request data
// into the contact object that the model should work with.
const createData = async (req, res, next) => {
  try {
    // Destructure the required fields from the request body
    // Shorthand for: const firstName = req.body.firstName; etc. etc.
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validation: is any required field in req.body missing or empty?
    // If any of these are true then code block executes and returns a 400 error response.
    // return stops execution of the function, db is not called, no contact is created.
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        error: 'All fields are required.',
      });
    }

    // Create a contact object with the validated data
    const contact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    // Passes the validated contact object to the model.
    // Waits for MongoDB to create a new contact, then stores the returned ID.
    const contactId = await contactsModel.createContact(contact);

    // Responds with:
    // 201 Created status,
    // JSON object with contactCreated property,
    // new contact's ID.
    res.status(201).json({
      contactCreated: true,
      id: contactId
    });
  } catch (error) {
    // next is a function Express gives us that allows us to hand an error
    // to Express's error-handling middleware.
    next(error);
  }
};


// PUT - update an existing contact
const updateData = async (req, res, next) => {
  try {
    // Get the contact ID from the URL parameters.
    const id = req.params.id;

    // Get the updated contact data from the request body.
    const contact = req.body;

    // Pass the ID and updated data to the model to update MongoDB.
    await contactsModel.updateContact(id, contact);

    // Send a successful response with no response body.
    res.status(204).send();
  } catch (error) {
    // Pass any error to Express error-handling middleware.
    next(error);
  }
};

// DELETE - delete an existing contact
const deleteData = async (req, res, next) => {
  try {
    // Get the contact ID from the URL parameters.
    const id = req.params.id;

    // Pass the ID to the model to delete the contact from MongoDB.
    await contactsModel.deleteContact(id);

    // Send a successful 200 response with a JSON object indicating deletion.
    res.status(200).json({
      contactDeleted: true
    });
  } catch (error) {
    // Pass any error to Express error-handling middleware.
    next(error);
  }
};

// Export CRUD functions.
module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData
};