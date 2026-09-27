// MAIN IDEA:
// What does my app include - what roads exist?

// Express sits on top of Node's HTTP capabilities
const express = require('express');
// Import the database connection module
const mongodb = require('./db/connect');
// Get file from the routes folder,
// acces to router.get() method to handle GET requests
const professionalRoutes = require('./routes/professional');

// express() is a function, creates an Express application when called.
const app = express();

// Middleware function to handle CORS issues:
// next keeps the app moving to the next middleware function in the stack
app.use((req, res, next) => {
    // Allow requests from any origin by setting header
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Route mounting: requests made to /professional will be handled by professionalRoutes
app.use('/professional', professionalRoutes);

// Decides which port the server will listen on, env var || default to 8080
const PORT = process.env.PORT || 8080;

// Chaining database initialization and server start processes. If the database connection is successful, the server starts listening on the specified port. If there's an error connecting to the database, it logs the error.
mongodb
    .initDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });