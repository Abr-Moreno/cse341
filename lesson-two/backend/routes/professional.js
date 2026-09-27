// MAIN IDEA:
// For traffic, which controller should receive it?

// Needed to create a router
const express = require('express');

// Retrieves from the professional controller file:
// getData function to handle GET requests
const professionalController = require('../controllers/professional');

// Create a router object to define routes
const router = express.Router();

// Defines a GET route:
// GET requests made to the root path of this router, will run the getData function from the professionalController
router.get('/', professionalController.getData);

// Export the router object
module.exports = router;