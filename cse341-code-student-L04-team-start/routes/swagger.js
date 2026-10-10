// Configures a router for serving the Swagger UI and the generated OpenAPI specification.
// "Take my swagger.json and make it available as a visual site."

const router = require('express').Router();

// Imports the swagger-ui-express module:
// Tool that creates the visual Swagger UI.
const swaggerUi = require('swagger-ui-express');
// Loads pre-generated OpenAPI specification from swagger.json file.
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;