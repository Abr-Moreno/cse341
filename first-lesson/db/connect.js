// MAIN IDEA:
// ==========
// How do I communicate with MongoDB?
// Establishes MongoDB connection once, keeps track of it, 
// and lets the rest of the app retrieve it.
// ==================================
// Official MongoDB Node.js driver install: npm install mongodb
// Software that allows Node.js to communicate with MongoDB, called "driver". Official driver for MongoDB is the "mongodb" package. Provides a set of methods and classes that allow to connect to a MongoDB database, perform CRUD operations, and manage collections and documents. This API uses the MongoClient class from the mongodb package to establish a connection to the MongoDB server.
// =============================================================

// Imports dotenv package that loads environment variable from .env file
const dotenv = require('dotenv');
// Communicates with MongoDB server via MongoClient class from the mongodb driver
// client/connection through which you can access the db and its collections.
const { MongoClient } = require('mongodb');

// Loads variable from .env into process.env
dotenv.config();

// Stores the MongoDB client so connection can be reused.
// _underscore prefix indicates it's a private variable.
let _client;

// Connect to MongoDB and returns the client instance.
const initDb = async () => {
  // If a connection already exists, return it to avoid creating multiple connections.
  if (_client) {
    console.log('Database already connected.');
    return _client;
  }

  // Establishes a connection to the MongoDB server using the URI from .env
  _client = await MongoClient.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB.');

  return _client;
};

// Returns the existing MongoDB client.
const getClient = () => {
  if (!_client) {
    throw new Error('Database not initialized.');
  }

  return _client;
};


// Export the initDb and getClient functions for use in other parts of the application
module.exports = {
  initDb,
  getClient
};