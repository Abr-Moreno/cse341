/*
MAIN IDEA:
==========

- Express.js error-handling middleware function. 
- In Express, middleware with four arguments (err, req, res, next) 
  acts as a catch-all net for errors that occur during the request-response cycle.
- Prevents server from crashing, logs error for debugging, and ensures client 
  receives a clean, standard response instead of hanging indefinitely.

- Authentication errors receive a 401 response.
- Unexpected app errors receive a 500 response.
=====================================================================
=====================================================================*/

// Declares an Express error-handling middleware function
const errorHandler = (err, req, res, next) => {

  // Checks whether the HTTP headers have already been sent to the client
  if (res.headersSent) {
    // If headers were already sent, cannot send another response.
    // Delegates the error back to Express's default built-in error handler.
    return next(err);
  }

  /*
 * AUTHENTICATION ERRORS:
 * ======================
 * MAIN IDEA:
 * - Auth0 can pass an HTTP status code along with an error.
 * - A 401 means the request requires an authenticated user.
 * - This is an expected security condition, not a server failure.
 */
  if (err.statusCode === 401 || err.status === 401) {
    return res.status(401).json({
      error: 'Authentication required.'
    });
  }

  // Logs unexpected errors and their stack traces for debugging.
  console.error(err);

  /*
 UNEXPECTED ERRORS:
 - Errors not specifically handled above are treated as server errors.
 - If headers have not been sent, sets the HTTP response status code to 500
 - (Internal Server Error) and starts building a JSON response.
 - Hides raw database or system error details from the client.
*/
  res.status(500).json({
    // Generic error message sent to the client.
    // (best practice for security).
    error: 'Internal server error.'
  });
};

module.exports = errorHandler;