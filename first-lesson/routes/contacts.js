// MAIN IDEA:
// ==========
// For contacts traffic, which controller should receive it?
// =========================================================

// Needed to create a router
const express = require('express');

// Access to controllers/contacts file:
// getData() function to handle GET requests.
const contactsController = require('../controllers/contacts');

// Create a router object to define routes
const router = express.Router();

// Defines a GET route:
// GET requests to /contacts, run getData() function from contactsController
router.get('/', contactsController.getData);

// Defines a Get route:
// GET requests to /contacts/:id, run getDataById() function from contactsController
// In server.js - app.use('/contacts', contactsRoutes) + router.get('/:id'...) =
// GET /contacts/:id
router.get('/:id', contactsController.getDataById);


// Export the router object
module.exports = router;