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
// GET requests to /contacts, run getAllContacts() function from contactsController
router.get('/', contactsController.getAllContacts
    /* #swagger.description = 'Retrieves a list of all contacts from the database.'
       #swagger.responses[200] = {
         description: 'Returns a list of contacts.',
         schema: [{ $ref: '#/definitions/Contact' }]
         } */);

// Defines a Get route:
// GET requests to /contacts/:id, run getContactById() function from contactsController
// In server.js - app.use('/contacts', contactsRoutes) + router.get('/:id'...) =
// GET /contacts/:id
router.get('/:id', contactsController.getContactById
    /* #swagger.description = 'Retrieves a specific contact by their ID.'
       #swagger.responses[200] = {
         description: 'Returns a single contact.',
         schema: { $ref: '#/definitions/Contact' }
         } */);

// Defines a POST route:
// Creates a new contact, runs createContact() function from contactsController
router.post('/', contactsController.createContact
    /* #swagger.description = 'Creates a new contact in the database.'
       #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: { $ref: '#/definitions/Contact' }
         } */);

// Defines a PUT route:
// Updates an existing contact, runs updateContact() function from contactsController
router.put('/:id', contactsController.updateContact
    /* #swagger.description = 'Updates an existing contact in the database.'
       #swagger.parameters['body'] = {
         in: 'body',
         required: true,
         schema: { $ref: '#/definitions/Contact' }
         } */);

// Defines a DELETE route:
// Deletes an existing contact, runs deleteContact() function from contactsController
router.delete('/:id', contactsController.deleteContact
    /* #swagger.description = 'Deletes an existing contact from the database.' */);

// Export the router object
module.exports = router;