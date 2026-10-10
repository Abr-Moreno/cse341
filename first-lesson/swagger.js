// This file generates an OpenAPI specification for the Contacts API using swagger-autogen.
// npm install --save-dev swagger-autogen --> Installs the swagger-autogen package as a development dependency to generate the OpenAPI specification.

// File created: swagger.json

// Imports swagger-autogen module.
const swaggerAutogen = require('swagger-autogen')();

// Determine which server the documentation should target:
/*
Locally: RENDER_EXTERNAL_URL isn't set - targets: http://localhost:3000.
Render: Render provides RENDER_EXTERNAL_URL. The script uses that URL.
*/
const serverUrl = process.env.RENDER_EXTERNAL_URL
  ? new URL(process.env.RENDER_EXTERNAL_URL)
  : new URL('http://localhost:3000');

// Describe the API
const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for Contacts project',
  },
  // Use hostname and protocol for current deployed environment.
  host: serverUrl.host,
  schemes: [serverUrl.protocol.replace(':', '')],
};

// Where the generated OpenAPI specification will be saved.
const outputFile = './swagger.json';

// Start examining the app at server.js
// Contacts router is mounted in server.js at /contacts
const endpointsFiles = ['./server.js'];

// Runs the swagger-autogen module to generate the OpenAPI specification.
swaggerAutogen(outputFile, endpointsFiles, doc);