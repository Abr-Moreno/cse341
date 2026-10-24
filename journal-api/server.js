// Express is a web framework for Node.js that simplifies the process of building web applications and APIs.
const express = require('express');

// Imports centralized error-handling middleware.
// Logs unexpected errors for debugging. returns a generic
// error response to client to avoid exposure of internal details.
const errorHandler = require('./middleware/errorHandler');

// Imports the database connection module.
const mongodb = require('./db/connect');

// Imports the 'configured' router to handle requests into /entries endpoint.
const entriesRoutes = require('./routes/entries');

// Imports the Swagger documentation router.
const swaggerRoutes = require('./routes/swagger');

// Creates the Express application through the express() function.
const app = express();

// Middleware to parse JSON bodies in requests:
// req is the HTTP request object, data contained inside its body is JSON.
// express.json() parses the JSON,
// Express puts the resulting JS object on req.body,
// JS code can now work with req.body
app.use(express.json());

// Mount Swagger routes at the /api-docs endpoint.
app.use('/api-docs', swaggerRoutes);
// Requests beginning with /entries are handled by entriesRoutes.
app.use('/entries', entriesRoutes);

// Centralized error handler.
app.use(errorHandler);

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