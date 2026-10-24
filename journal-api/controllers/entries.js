/* 
MAIN IDEA:
==========
- The controller coordinates HTTP requests and the app's data layer.
 
- It receives requests, decides what should happen,
  calls the model, and sends HTTP responses.
=====================================================================
=====================================================================*/


// Import journal entry data access functions from the entries model.
const entriesModel = require('../models/entries');

// TEMPORARY: user id for testing.
const TEST_USER_ID = 'test-user-001';

// HELPER FUNCTION:
// Creates the current date and time as M/D/YYYY h:mm AM/PM.
const dateTime = () => {
  // New date object.
  const now = new Date();

  // Returns a string
  return now.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

// GET all journal entries.
const getAllEntries = async (req, res, next) => {
  try {
    // Retrieve all journal entries from MongoDB.
    const data = await entriesModel.getAllEntriesM();

    // Send the entries with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// GET a single journal entry by ID.
const getEntryById = async (req, res, next) => {
  try {
    // Extract the entry ID from the URL parameters.
    // At this point, id has been validated by middleware.
    const id = req.params.id;

    // Retrieve the entry matching the requested ID.
    const entry = await entriesModel.getEntryByIdM(id);

    // If entry does not exist, return code 404 (Not Found).
    if (!entry) {
      // return - stops controller from continuing.
      return res.status(404).json({
        error: 'Journal entry not found.'
      });
    }

    // Send the matching entry with a successful HTTP response.
    res.status(200).json(entry);
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// POST: Create a new journal entry.
// Apply server-controlled fields:
// generate timestamps, initialize isEdited, and assign the test user ID.
// Create the document: send the prepared object to the model.
const createEntry = async (req, res, next) => {
  try {
    // Destructure the required, validated fields from the request body
    // Shorthand for: const title = req.body.title; etc..
    const { title, entry, location, gratitudeTags } = req.body;

    // Build the journal entry document.
    // Server-controlled fields are not accepted from the request body.
    const newEntry = {
      title: title,
      entry: entry,
      createdAt: dateTime(),
      updatedAt: dateTime(),
      isEdited: false,
      location: location ?? null,
      gratitudeTags: gratitudeTags ?? [],
      userId: TEST_USER_ID
    };

    // Ask the model to insert the new entry into MongoDB.
    // Model returns ID MongoDB generated for the new journal entry.
    const entryId = await entriesModel.createEntryM(newEntry);

    // Respond with 201 Created and the new entry's ID.
    res.status(201).json({
      entryCreated: true,
      id: entryId
    });
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// PUT: Update an existing journal entry.
const updateEntry = async (req, res, next) => {
  try {
    // Extract validated ID from the URL parameters.
    const id = req.params.id;

    // Extract the editable fields from the request body.
    const { title, entry, location, gratitudeTags } = req.body;

    // Retrieve the existing entry so we can preserve fields.
    const existingEntry = await entriesModel.getEntryByIdM(id);

    // Kept in controller bc it's a resource-existence check, 
    // not a request-body validation.
    if (!existingEntry) {
      // 404 = Not Found
      return res.status(404).json({
        error: 'Journal entry not found.'
      });
    }

    // Build the replacement document while preserving original metadata.
    const updatedEntry = {
      title: title,
      entry: entry,
      createdAt: existingEntry.createdAt,
      updatedAt: dateTime(),
      isEdited: true,
      location: location ?? null,
      gratitudeTags: gratitudeTags ?? [],
      userId: existingEntry.userId
    };

    // Replace the existing entry in MongoDB.
    await entriesModel.updateEntryM(id, updatedEntry);

    // Send a successful response with no response body.
    res.status(204).send();
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// DELETE: Delete an existing journal entry.
const deleteEntry = async (req, res, next) => {
  try {
    // Extract validated entry ID from the URL parameters.
    const id = req.params.id;

    // Ask the model to delete the entry from MongoDB.
    // result object is returned from the model.
    const result = await entriesModel.deleteEntryM(id);

    // deletedCount is a result property, should be 1 if successful.
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: 'Journal entry not found.'
      });
    }

    // Send a successful response confirming deletion.
    res.status(200).json({
      entryDeleted: true
    });
  } catch (error) {
    // Forwards error to centralized handler, to decide how to respond.
    next(error);
  }
};

// Export controller functions for the routes to use.
module.exports = {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry
};
