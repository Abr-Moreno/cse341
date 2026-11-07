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
    description: `
    Journal API for managing personal journal entries and retrieving public journal prompts.
    
    Journal entries:
    Authenticated users can create, read, update, and delete their own journal entries. All /entries endpoints require an authenticated session. Users can only access and modify entries associated with their Auth0 user ID. Unauthenticated requests receive a 401 Unauthorized response.

    Journal prompts:
    The /prompts endpoint provides public access to the available journal prompts. Authentication is not required. Prompts are read-only through this API.

    Authentication:
    User authentication and account management are handled through Auth0's hosted login using express-openid-connect. The application maintains an authenticated session after succssful login.
    `
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
      userId: 'auth0|abc123xyz'
    },

    // Response returned after creating a new journal entry.
    CreateEntryResponse: {
      entryCreated: true,
      id: '6712abc12345678901234567'
    },

    // Response returned after deleting a journal entry.
    DeleteEntryResponse: {
      entryDeleted: true
    },

    // Journal prompt returned by GET endpoint.
    JournalPrompt: {
      id: '6712abc12345678901234567',
      prompt: 'What is one thing you are grateful for today?'
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