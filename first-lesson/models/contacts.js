// MAIN IDEA:
// ==========
// How does my app access and manipulate data in the db?
// =====================================================

// Import MongoDB connection module.
const mongoDb = require('../db/connect');

// Import ObjectId so we can convert a URL ID into MongoDB's ID type.
const { ObjectId } = require('mongodb');

const getContacts = async () => {
  // Gets the MongoDB client established in connect.js
  const client = mongoDb.getClient();

  // Selects the contactDb database and its contacts collection.
  const collection = await client
    .db('contactsDb') // Use the 'contactsDb' database
    .collection('contacts') // Access the 'contacts' collection
    // Find documents in the collection without applying a filter.
    .find({}) // The {} is an empty filter.
    .toArray();// find returns a cursor, converted to an array using toArray().

  return collection;
};

const getContactById = async (id) => {
  // Gets the MongoDB client established in connect.js
  const client = mongoDb.getClient();
  // Selects the contactDb database and its contacts collection.
  const collection = await client
    .db('contactsDb')
    .collection('contacts')
    // Convert URL ID from string into MongoDB ObjectId for querying.
    .findOne({ _id: new ObjectId(id) }); // Find a single document by its _id.

  return collection;
};

// POST: Create a new contact in the database.
const createContact = async (contact) => {
  // Get the existing MongoDB client connection.
  const client = mongoDb.getClient();

  // Access the contactsDb database, the contacts collection,
  // and insert the new contact document.
  const result = await client
    .db('contactsDb')
    .collection('contacts')
    .insertOne(contact);

  // Return the ID MongoDB generated for the new contact.
  return result.insertedId;
};


// PUT: Update an existing contact in the database.
const updateContact = async (id, contact) => {
  // Get the existing MongoDB client connection.
  const client = mongoDb.getClient();

  // Find the contact by its MongoDB _id and replace it
  // with the updated contact data.
  const result = await client
    .db('contactsDb')
    .collection('contacts')
    .replaceOne(
      { _id: new ObjectId(id) },
      contact
    );

  // Return MongoDB's result describing the update operation.
  return result;
};


// DELETE: Delete a contact from the database.
const deleteContact = async (id) => {
  // Get the existing MongoDB client connection.
  const client = mongoDb.getClient();

  // Find the contact by its MongoDB _id and delete it.
  const result = await client
    .db('contactsDb')
    .collection('contacts')
    .deleteOne({ _id: new ObjectId(id) });

  // Return MongoDB's result describing the delete operation.
  return result;
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};