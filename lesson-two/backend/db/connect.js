// MAIN IDEA:
// How do I communicate with MongoDB?

const dotenv = require('dotenv');
// Communicates with MongoDB server
const { MongoClient } = require('mongodb');

// Load environment variables from .env file
dotenv.config();

// Variable to hold the database connection instance
// _underscore prefix indicates it's a private variable
let _db;

// Initializes the database connection
const initDb = async () => {
  if (_db) {
    console.log('Database already connected.');
    return _db;
  }

  // Establishes a connection to the MongoDB server using the URI from environment variable
  const client = await MongoClient.connect(process.env.MONGODB_URI);

  // Once connected, store the database instance in _db for future use
  _db = client;

  console.log('Connected to MongoDB.');

  return _db;
};

// Retrieves the database connection instance, 
// if it exists, otherwise throws an error
const getDb = () => {
  if (!_db) {
    throw new Error('Database not initialized.');
  }

  return _db;
};


// Export the initDb and getDb functions for use in other parts of the application
module.exports = {
  initDb,
  getDb
};