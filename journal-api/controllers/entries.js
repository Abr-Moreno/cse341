
/* MAIN IDEA:
 * ==========
 * The controller coordinates HTTP requests and the app's data layer.
 *
 * It receives requests, validates input, decides what should happen,
 * calls the model, and sends HTTP responses.
 */

// Import journal entry data access functions from the entries model.
const entriesModel = require('../models/entries');

// TEMPORARY: user id for testing.
const TEST_USER_ID = 'test-user-001';

// GET all journal entries.
const getAllEntries = async (req, res, next) => {
  try {
    // Retrieve all journal entries from MongoDB.
    const data = await entriesModel.getAllEntriesM();

    // Send the entries with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// GET a single journal entry by ID.
const getEntryById = async (req, res, next) => {
  try {
    // Extract the entry ID from the URL parameters.
    const id = req.params.id;

    // Retrieve the entry matching the requested ID.
    const data = await entriesModel.getEntryByIdM(id);

    // Send the matching entry with a successful HTTP response.
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// POST: Create a new journal entry.
// Validate client input: makes sure required fields exist and optional fields have acceptable types.
// Enforce server-owned rules: generate timestamps, initialize isEdited, and assign the test user ID.
// Create the document: send the prepared object to the model.
const createEntry = async (req, res, next) => {
  try {
    // Destructure the required fields from the request body
    // Shorthand for: const title = req.body.title; etc..
    const { title, entry, location, gratitudeTags } = req.body;

    // Validate the required fields.
    // title and entry need to be actual, non-empty strings.
    if (
      typeof title !== 'string' || title.trim() === '' ||
      typeof entry !== 'string' || entry.trim() === ''
    ) {
      return res.status(400).json({
        error: 'Title and entry are required.'
      });
    }

    // location != null checks for both null and undefined. 
    // Reject invalid types while allowing omitted location or null.
    if (
      location != null &&
      typeof location !== 'string'
    ) {
      return res.status(400).json({
        error: 'Location must be a string or null.'
      });
    }

    // gratitudeTags !== undefined --> omitted field is allowed,
    // but an explicit null is rejected.
    // Tags default to [] and aren't nullable.
    if (
      gratitudeTags !== undefined &&
      (
        !Array.isArray(gratitudeTags) ||
        !gratitudeTags.every(tag => typeof tag === 'string')
      )
    ) {
      return res.status(400).json({
        error: 'Gratitude tags must be an array of strings.'
      });
    }

    // Generates timestamps on the server.
    const now = new Date();

    // Build the journal entry document.
    // Server-controlled fields are not accepted from the request body.
    const newEntry = {
      title: title.trim(),
      entry: entry.trim(),
      createdAt: now,
      updatedAt: now,
      isEdited: false,
      location: location ?? null,
      gratitudeTags: gratitudeTags ?? [],
      userId: TEST_USER_ID
    };

    // Ask the model to insert the new entry into MongoDB.
    // Model returns ID MongoDB generated for the new contact.
    const entryId = await entriesModel.createEntryM(newEntry);

    // Respond with 201 Created and the new entry's ID.
    res.status(201).json({
      entryCreated: true,
      id: entryId
    });
  } catch (error) {
    next(error);
  }
};

// PUT: Update an existing journal entry.
const updateEntry = async (req, res, next) => {
  try {
    // Extract the entry ID from the URL parameters.
    const id = req.params.id;

    // Extract the editable fields from the request body.
    const { title, entry, location, gratitudeTags } = req.body;

    // Validate the required fields.
    // title and entry need to be actual, non-empty strings.
    if (
      typeof title !== 'string' || title.trim() === '' ||
      typeof entry !== 'string' || entry.trim() === ''
    ) {
      return res.status(400).json({
        error: 'Title and entry are required.'
      });
    }

    // location != null checks for both null and undefined. 
    // Reject invalid types while allowing omitted location or null.
    if (
      location != null &&
      typeof location !== 'string'
    ) {
      return res.status(400).json({
        error: 'Location must be a string or null.'
      });
    }

    // gratitudeTags !== undefined --> omitted field is allowed,
    // but an explicit null is rejected.
    // Tags default to [] and aren't nullable.
    if (
      gratitudeTags !== undefined &&
      (
        !Array.isArray(gratitudeTags) ||
        !gratitudeTags.every(tag => typeof tag === 'string')
      )
    ) {
      return res.status(400).json({
        error: 'Gratitude tags must be an array of strings.'
      });
    }

    // Retrieve the existing entry so we can preserve fields.
    const existingEntry = await entriesModel.getEntryByIdM(id);

    if (!existingEntry) {
      return res.status(404).json({
        error: 'Journal entry not found.'
      });
    }

    // Build the replacement document while preserving original metadata.
    const updatedEntry = {
      title: title.trim(),
      entry: entry.trim(),
      createdAt: existingEntry.createdAt,
      updatedAt: new Date(),
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
    // Pass any error to Express error-handling middleware.
    next(error);
  }
};

// DELETE: Delete an existing journal entry.
const deleteEntry = async (req, res, next) => {
  try {
    // Extract the entry ID from the URL parameters.
    const id = req.params.id;

    // Ask the model to delete the entry from MongoDB.
    // result object is returned from the model.
    const result = await entriesModel.deleteEntryM(id);

    // deletedCount is a result property, should be 1 is successful.
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
