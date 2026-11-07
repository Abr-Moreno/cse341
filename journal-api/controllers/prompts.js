/* 
MAIN IDEA:
==========
- The controller coordinates HTTP requests and the app's data layer.
 
- It receives requests, decides what should happen,
  calls the model, and sends HTTP responses.
=====================================================================
=====================================================================*/

// Import journal prompt data access function from the prompts model.
const promptsModel = require('../models/prompts');

// GET all journal prompts.
const getAllPrompts = async (req, res, next) => {
  try {
    // Retrieve all journal prompts from MongoDB using model function.
    const data = await promptsModel.getAllPromptsM();

    // Send the prompts with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// Exports controller function
module.exports = {
  getAllPrompts
}