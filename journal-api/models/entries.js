/*
MAIN IDEA:
==========
- How does my app access and manipulate data in the db?
- Function names include letter "M" - indicate "Model" functions.
=====================================================*/

// Import MongoDB connection module.
const mongoDb = require('../db/connect');

// Import ObjectId so we can convert a URL ID into MongoDB's ID type.
const { ObjectId } = require('mongodb');

//Helper function to get the collection from the database
const getEntriesCollection = () => {
  // Gets the MongoDB client established in connect.js
  const client = mongoDb.getClient();

  // Access the 'journalDb' database and the 'entries' collection
  return client.db('journalDb').collection('entries');
};

// GET: Retrieve all journal entries.
const getAllEntriesM = async () => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to return all documents in the collection.
  // Finds documents in the collection without applying a filter.
  // {} --> empty filter.
  // find returns a cursor, convert to an array using toArray().
  const entries = await collection.find({}).toArray();

  return entries;
};

// GET: Retrieve single journal entry by its ID.
const getEntryByIdM = async (id) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to return the document that matches the given ID.
  // Converts URL ID from string to MongoDB ObjectId for querying.
  // findOne returns the first document that matches the filter.
  const entry = await collection.findOne({ _id: new ObjectId(id) });

  return entry;
};

// POST: Create a new journal entry.
const createEntryM = async (entry) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to insert the document.
  const result = await collection.insertOne(entry);

  // Returns the ID MongoDB generated for the new contact.
  return result.insertedId;
};

// PUT: Update an existing journal entry (by id)
const updateEntryM = async (id, entry) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to replace matching document.
  const result = await collection.replaceOne(
    { _id: new ObjectId(id) },
    entry
  );

  // Return the result for controller to check.
  return result;
};

// DELETE: Delete a journal entry (by id).
const deleteEntryM = async (id) => {
  const collection = getEntriesCollection();

  // Wait for MongoDb to delete matching document.
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  // Return result for controller to check.
  return result;
};

// Export model functions for the controllers to use.
module.exports = {
  getAllEntriesM,
  getEntryByIdM,
  createEntryM,
  updateEntryM,
  deleteEntryM,
};