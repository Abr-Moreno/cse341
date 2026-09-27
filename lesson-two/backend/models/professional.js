// MAIN IDEA:
// How does my app retrieve data from the database?

// Retrieves MongoDB connection that connect.js established when app started.
const mongodb = require('../db/connect');

const getProfessional = async () => {
  const db = mongodb.getDb();

  const result = await db
    .db('professional') // Use the 'professional' database
    .collection('user') // Access the 'users' collection
    .findOne({}); // One document is returned, no filter criteria provided, so it returns the first document found.

  return result;
};

module.exports = {
  getProfessional,
};