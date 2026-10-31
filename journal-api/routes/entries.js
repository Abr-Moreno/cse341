/*
MAIN IDEA:
==========
- Builds/configures an Express router, then exports that configured
  router so server.js can mount and use it under /entries.
- Router will route requests to the corresponding controller functions:
  Get, Get by ID, Post, Put, Delete.
- Express will run authentication and validation first, then the controller
  only if those checks succeed.
- If authentication fails, the request is denied.
- If validation fails, sends 400 response and the controller never runs.
=====================================================================
=====================================================================*/

// Needed to create a router
const express = require('express');
// Auth0 middleware to require an authenticated user
const { requiresAuth } = require('express-openid-connect');
// Joi validation for URL id parameter
const validateId = require('../middleware/validateId');
// Joi validation for incoming request bodies - POST & PUT
const validateEntry = require('../middleware/validateEntry');
// Access to controllers/entries.js file:
const entriesController = require('../controllers/entries');

// Create a router object to define routes
const router = express.Router();

/*
 Authentication
 - Protects every route defined in this router.
 - requiresAuth() checks whether the request has an authentication session.
 - If the user is not authenticated, the request is denied.
 - If authenticated, Express continues to the route and its middleware. 

 - Applies to all /entries endpoints without repeating requiresAuth()
 - on every individual route. */
router.use(requiresAuth());

/*=======================================================================
- ROUTES:
- Express will combine app.use('/entries', entriesRouter) in server.js 
  with the routes defined here.
========================================================================*/

// GET all journal entries
router.get('/', entriesController.getAllEntries
  /* #swagger.description = 'Retrieves all journal entries from the database.'
     #swagger.responses[200] = {
       description: 'Returns an array of journal entries.',
       schema: [{ $ref: '#/definitions/JournalEntry' }]
     }
     #swagger.responses[401] = {
       description: 'Authentication required. User must be logged in to access this endpoint.'
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */);

// GET a single journal entry by ID
router.get('/:id', validateId, entriesController.getEntryById
  /* #swagger.description = 'Retrieves a specific journal entry by its ID.'
     #swagger.responses[200] = {
       description: 'Returns the requested journal entry.',
       schema: { $ref: '#/definitions/JournalEntry' }
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry ID.'
     }
     #swagger.responses[401] = {
       description: 'Authentication required. User must be logged in to access this endpoint.'
     }
     #swagger.responses[404] = {
       description: 'Journal entry not found.'
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */);

// POST a new journal entry
// Validates user input data using Joi
router.post('/', validateEntry, entriesController.createEntry
  /* #swagger.description = 'Creates a new journal entry.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/JournalEntryInput' }
     }
     #swagger.responses[201] = {
       description: 'Journal entry created successfully.'
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry data.'
     }
     #swagger.responses[401] = {
       description: 'Authentication required. User must be logged in to access this endpoint.'
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */);

// PUT (update) an existing journal entry by ID
// Validates user input data using Joi
router.put('/:id', validateId, validateEntry, entriesController.updateEntry
/* #swagger.description = 'Updates an existing journal entry.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/JournalEntryInput' }
     }
     #swagger.responses[204] = {
       description: 'Journal entry updated successfully. No response body is returned.'
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry ID or request body.'
     }
     #swagger.responses[401] = {
       description: 'Authentication required. User must be logged in to access this endpoint.'
     }
     #swagger.responses[404] = {
       description: 'Journal entry not found.'
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */);


// DELETE a journal entry by ID
router.delete('/:id', validateId, entriesController.deleteEntry
 /* #swagger.description = 'Deletes a journal entry by its ID.'
     #swagger.responses[200] = {
       description: 'Journal entry deleted successfully.'
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry ID.'
     }
     #swagger.responses[401] = {
       description: 'Authentication required. User must be logged in to access this endpoint.'
     }
     #swagger.responses[404] = {
       description: 'Journal entry not found.'
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */);

// Export the router so it can be used in server.js
module.exports = router;