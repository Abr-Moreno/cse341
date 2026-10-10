// This file generates the OpenAPI specification for the Temple API using swagger-autogen.
// npm install --save-dev swagger-autogen --> Install the swagger-autogen package as a development dependency to generate the OpenAPI specification.

// File name: swagger.js

// Imports swagger-autogen module.
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Temple API',
    description: 'API for LDS temples',
  },
  // Where the Express server is running
  host: 'localhost:8080',
  // Local API uses HTTP, rather than HTTPS
  schemes: ['http'],
};

// Put the generated OpenAPI specification in a file called swagger.json
const outputFile = './swagger.json';
// Starts examining the endpoints here.
const endpointsFiles = ['./routes/index.js'];

// Runs the swagger-autogen module to generate the OpenAPI specification.
swaggerAutogen(outputFile, endpointsFiles, doc);