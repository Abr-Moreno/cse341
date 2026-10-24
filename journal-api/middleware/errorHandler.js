/*
MAIN IDEA:
==========

- Express.js error-handling middleware function. 
- In Express, middleware with four arguments (err, req, res, next) 
  acts as a catch-all net for errors that occur during the request-response cycle.
  Prevents server from crashing, logs error for debugging, and ensures client 
  receives a clean, standard response instead of hanging indefinitely.
=====================================================================
=====================================================================*/

// Declares an Express error-handling middleware function
const errorHandler = (err, req, res, next) => {
  // Logs full error object and its stack trace to server's console
  console.error(err);

  // Checks whether the HTTP headers have already been sent to the client
  if (res.headersSent) {
    // If headers were already sent, cannot send another response.
    // Delegates the error back to Express's default built-in error handler.
    return next(err);
  }

  // If headers have not been sent, sets the HTTP response status code to 500
  // (Internal Server Error) and starts building a JSON response.
  res.status(500).json({
    // Generic error message sent to the client.
    // Hides raw database or system error details from the client
    // (best practice for security).
    error: 'Internal server error.'
  });
};

module.exports = errorHandler;