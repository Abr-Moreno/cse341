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

//Helper function to get the 'entries' collection from the journalDb database
const getEntriesCollection = () => {
  // Gets the MongoDB client established in connect.js
  const client = mongoDb.getClient();

  // Access the 'journalDb' database and the 'entries' collection
  return client.db('journalDb').collection('entries');
};

// GET: Retrieve all journal entries of authenticated user.
const getAllEntriesM = async (userId) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to return all entries belonging to 
  // the authenticated user. The filter is an object with a key-value pair.
  // Find docs where value of userId field equals value stored in our JS variable userId.
  // find returns a cursor, convert to an array using toArray().
  const entries = await collection.find({ userId: userId }).toArray();

  return entries;
};

// GET: Retrieve single journal entry by its ID.
const getEntryByIdM = async (id, userId) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to return the document that matches the given ID.
  // Converts URL ID from string to MongoDB ObjectId for querying.
  // findOne returns the first document that matches the filter.
  const entry = await collection.findOne({ _id: new ObjectId(id), userId: userId });

  return entry;
};

// POST: Create a new journal entry.
const createEntryM = async (entry) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to insert the document.
  const result = await collection.insertOne(entry);

  // Returns the ID MongoDB generated for the new journal entry.
  return result.insertedId;
};

// PUT: Update an existing journal entry (by id)
const updateEntryM = async (id, userId, updatedEntry) => {
  const collection = getEntriesCollection();

  // Wait for MongoDB to replace matching document.
  const result = await collection.replaceOne(
    {
      _id: new ObjectId(id),
      userId: userId
    },
    updatedEntry
  );

  // Return the result for controller to check.
  return result;
};

// DELETE: Delete a journal entry (by id).
const deleteEntryM = async (id, userId) => {
  const collection = getEntriesCollection();

  // Wait for MongoDb to delete matching document.
  const result = await collection.deleteOne({ _id: new ObjectId(id), userId: userId });

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