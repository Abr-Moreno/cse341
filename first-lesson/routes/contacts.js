// MAIN IDEA:
// ==========
// For contacts traffic, which controller function should receive it?
// Builds/configures an Express router, then exports that 
// configured router so server.js can mount and use it under /contacts.
// =========================================================

// Needed to create a router
const express = require('express');

// Access to controllers/contacts.js file:
const contactsController = require('../controllers/contacts');

// Create a router object to define routes
const router = express.Router();

// =======================================================================
// Router will route requests to the corresponding controller functions
// Get, Get by ID, Post, Put, Delete
// =======================================================================

// Defines a GET route:
// GET requests to /contacts, run getData() function from contactsController
router.get('/', contactsController.getData);

// Defines a Get route:
// GET requests to /contacts/:id, run getDataById() function from contactsController
// In server.js - app.use('/contacts', contactsRoutes) + router.get('/:id'...) =
// GET /contacts/:id
router.get('/:id', contactsController.getDataById);

// Defines a POST route:
// Creates a new contact, runs createData() function from contactsController
router.post('/', contactsController.createData);

// Defines a PUT route:
// Updates an existing contact, runs updateData() function from contactsController
router.put('/:id', contactsController.updateData);

// Defines a DELETE route:
// Deletes an existing contact, runs deleteData() function from contactsController
router.delete('/:id', contactsController.deleteData);

// Export the router object
module.exports = router;