// MAIN IDEA:
// ==========
// How does my app retrieve data from the database?
// =================================================

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

module.exports = {
  getContacts,
  getContactById,
};