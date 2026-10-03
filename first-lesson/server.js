// MAIN IDEA:
// ==========
// What does this app include, what routes exist, how does the server start?
// ============================================

// Express library sits on top of Node's HTTP capabilities
const express = require('express');
// Import the database connection module.
const mongodb = require('./db/connect');

// Import the 'configured' router to handle requests into /contacts endpoint.
const contactsRoutes = require('./routes/contacts');

// Creates the Express application through the express() function.
const app = express();

// Middleware to parse JSON bodies in requests:
// req is the HTTP request object, data contained inside its body is JSON.
// express.json() parses the JSON,
// Express puts the resulting JS object on req.body,
// JS code can now work with req.body
app.use(express.json());

// Route mounting: 
// Requests beginning with /contacts are handled by contactsRoutes
app.use('/contacts', contactsRoutes);

// Use the port provided by the environment, or 3000 locally.
const PORT = process.env.PORT || 3000;

// If database connection successful, the server starts listening.
// If there's an error connecting to the database, it logs the error.
// Prevents app from accepting requests when database isn't available.
const startServer = async () => {
  try {
    await mongodb.initDb();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
};

// Starts the server - successful if the database connects.
startServer();