/*
  MAIN IDEA:
  ==========
  - Generate the OpenAPI specification for this Journal API.

  - swagger-autogen examines the routes and generates swagger.json.
  - Swagger UI will then use it to display the API documentation.
  - npm install --save-dev swagger-autogen --> Installs the swagger-autogen package as a
    development dependency to generate the OpenAPI specification.
  =======================================================================
*/

// Imports swagger-autogen module.
const swaggerAutogen = require('swagger-autogen')();

/*
Determine which server the documentation should target:
- Locally: RENDER_EXTERNAL_URL isn't set - targets: http://localhost:3000.
- Render: Render provides RENDER_EXTERNAL_URL. The script uses that URL.
*/
const serverUrl = process.env.RENDER_EXTERNAL_URL
  ? new URL(process.env.RENDER_EXTERNAL_URL)
  : new URL('http://localhost:3000');

// Describe the API
const doc = {
  info: {
    title: 'Journal API',
    description: 'API for creating, retrieving, updating, and deleting journal entries',
  },
  // Use hostname and protocol for current deployed environment.
  host: serverUrl.host,
  schemes: [serverUrl.protocol.replace(':', '')],

  // Fields accepted from the client in POST & PUT requests.
  // location and gratitudeTags can be omitted.
  definitions: {
    JournalEntryInput: {
      title: 'A meaningful day',
      entry: 'Today I spent time with my family and reflected on the day.',
      location: 'Amsterdam, Netherlands',
      gratitudeTags: ['family', 'gratitude'],
    },

    // Journal entry returned by GET endpoints.
    JournalEntry: {
      _id: '6712abc12345678901234567',
      title: 'A meaningful day',
      entry: 'Today I spent time with my family.',
      createdAt: '10/17/2026, 3:02 PM',
      updatedAt: '10/17/2026, 3:02 PM',
      isEdited: false,
      location: 'Amsterdam, Netherlands',
      gratitudeTags: ['family', 'gratitude'],
      userId: 'test-user-001'
    }
  }
};

// Location where the generated OpenAPI specification is saved.
const outputFile = './swagger.json';

// Start examining the app at server.js
// entries router is mounted in server.js at /entries
const endpointsFiles = ['./server.js'];

// Generates the OpenAPI specification.
swaggerAutogen(outputFile, endpointsFiles, doc);