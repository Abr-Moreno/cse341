/*
MAIN IDEA:
==========
- How does my app access prompt data in the db?
- Function names include letter "M" - indicate "Model" functions.
=====================================================*/

// Import MongoDB connection module.
const mongoDb = require('../db/connect');

// Helper function to get the 'prompts' collection from the journalDb database
const getPromptsCollection = () => {
  const client = mongoDb.getClient();
  return client.db('journalDb').collection('prompts');
};

// GET: Retrieve all journal prompts.
const getAllPromptsM = async () => {
  const collection = getPromptsCollection();

  const prompts = await collection.find({}).toArray();

  return prompts;
};

// Exports model function.
module.exports = {
  getAllPromptsM
}