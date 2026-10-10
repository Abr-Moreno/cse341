/*
  MAIN IDEA:
  ==========
  Serve the generated Swagger documentation through an interactive 
  browser interface at /api-docs endpoint.
  
  Configures a router for serving the Swagger UI and the generated OpenAPI specification.
  "Take my swagger.json and make it available as a visual site."
  =======================================================================
*/

// Configures a router for serving the Swagger UI and the generated OpenAPI specification.
// "Take my swagger.json and make it available as a visual site."

const router = require('express').Router();

// Imports the swagger-ui-express module:
// Tool that creates the visual Swagger UI.
const swaggerUi = require('swagger-ui-express');
// Loads pre-generated OpenAPI specification from swagger.json file.
const swaggerDocument = require('../swagger.json');

// Serves the Swagger UI at /api-docs endpoint.
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

// Export the configured router so server.js can mount and use it under /api-docs.
module.exports = router;