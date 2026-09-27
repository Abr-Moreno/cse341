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
  const collection = client
    .db('contactsDb') // Use the 'contactsDb' database
    .collection('contacts'); // Access the 'contacts' collection

  // Retrieves all documents from the contacts collection and converts them to an array.
  // Find documents in the collection without applying a filter.
  // The {} is an empty filter.
  // find returns a cursor, which we convert to an array using toArray().
  const result = await collection.find({}).toArray();

  return result;
};

const getContactById = async (id) => {
  // Gets the MongoDB client established in connect.js
  const client = mongoDb.getClient();
  // Selects the contactDb database and its contacts collection.
  const collection = client
    .db('contactsDb') // Use the 'contactsDb' database
    .collection('contacts'); // Access the 'contacts' collection

  // Conert URL ID from string into MongoDB ObjectId.
  const objectId = new ObjectId(id);

  // Find document _id that matches the ObjectId.
  const result = await collection.findOne({ _id: objectId });

  return result;
};

module.exports = {
  getContacts,
  getContactById,
};