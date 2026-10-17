/*
MAIN IDEA:
==========
- Builds/configures an Express router, then exports that configured 
  router so server.js can mount and use it under /entries.
- Router will route requests to the corresponding controller functions:
  Get, Get by ID, Post, Put, Delete.
=====================================================================
=====================================================================*/

// Needed to create a router
const express = require('express');

// Access to controllers/entries.js file:
const entriesController = require('../controllers/entries');

// Create a router object to define routes
const router = express.Router();

/*=======================================================================
- ROUTES:
- Express will combine app.use('/entries', entriesRouter) in server.js 
  with the routes defined here.
========================================================================*/

// GET all journal entries
router.get('/', entriesController.getAllEntries
  /* #swagger.description = 'Retrieves all journal entries from the database.'
     #swagger.responses[200] = {
       description: 'Returns a list of journal entries.',
       schema: [{ $ref: '#/definitions/JournalEntry' }]
      } */);

// GET a single journal entry by ID
router.get('/:id', entriesController.getEntryById
  /* #swagger.description = 'Retrieves a specific journal entry by its ID.'
     #swagger.responses[200] = {
       description: 'Returns a single journal entry.',
       schema: { $ref: '#/definitions/JournalEntry' }
     }
     #swagger.responses[404] = {
       description: 'Journal entry not found.'
     } */);

// POST a new journal entry
router.post('/', entriesController.createEntry
  /* #swagger.description = 'Creates a new journal entry.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/JournalEntry' }
     }
     #swagger.responses[201] = {
       description: 'Journal entry created successfully.'
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry data.'
     } */);

// PUT (update) an existing journal entry by ID
router.put('/:id', entriesController.updateEntry
  /* #swagger.description = 'Updates an existing journal entry by its ID.'
     #swagger.parameters['body'] = {
       in: 'body',
       required: true,
       schema: { $ref: '#/definitions/JournalEntry' }
     }
     #swagger.responses[204] = {
       description: 'Journal entry updated successfully.'
     }
     #swagger.responses[400] = {
       description: 'Invalid journal entry data.'
     }
     #swagger.responses[404] = {
       description: 'Journal entry not found.'
     } */);

// DELETE a journal entry by ID
router.delete('/:id', entriesController.deleteEntry
  /* #swagger.description = 'Deletes a journal entry by its ID.'
     #swagger.responses[200] = {
       description: 'Delete request processed.'
     } */);

// Export the router so it can be used in server.js
module.exports = router;