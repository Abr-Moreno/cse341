/*
MAIN IDEA:
==========
- Express.js middleware function; designed to validate whether a 
  URL parameter (id) is a valid MongoDB ObjectId before allowing the 
  request to proceed to the main route handler.
=====================================================================
=====================================================================*/

// Imports ObjectId class from official MongoDB Node.js driver.
const { ObjectId } = require('mongodb');

const validateId = (req, res, next) => {
  // Retrieves id from URL
  const { id } = req.params;

  // Block runs if id is invalid
  if (!ObjectId.isValid(id)) {
    // Stops further execution and sends HTTP status code 
    // 400 (Bad Request) back to the client.
    return res.status(400).json({
      // JSON body returned to client.
      error: 'Invalid journal entry ID.'
    });
  }

  // If id is valid, passes control along to route controller.
  next();
};

module.exports = validateId;