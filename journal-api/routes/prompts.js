/*
MAIN IDEA:
==========
- Builds/configures an Express router for public journal prompt endpoints. 
- Routes requests to the corresponding prompts controller function. 
=====================================================================
=====================================================================*/

// Import Express
const express = require('express');

// Import journal prompts controller
const promptsController = require('../controllers/prompts');

// Create an Express router
const router = express.Router();

// GET: Retrieve all journal prompts
router.get('/', promptsController.getAllPrompts
  /* #swagger.description = 'Retrieves all journal prompts.'
     #swagger.responses[200] = {
       description: 'Returns an array of journal prompts.',
       schema: [{ $ref: '#/definitions/JournalPrompt' }]
     }
     #swagger.responses[500] = {
       description: 'Internal server error.'
     } */
);

// Export router
module.exports = router;
