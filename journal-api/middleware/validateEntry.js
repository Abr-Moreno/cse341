/*
MAIN IDEA:
==========

- Express.js middleware function; uses the Joi validation library to 
  ensure incoming request bodies conform to a strict schema. 
- Checks types, strips or rejects unauthorized fields, 
  normalizes data (trimming strings), 
  and returns clear error messages if validation fails.
=====================================================================
=====================================================================*/

// Imports Joi library
const Joi = require('joi');

// Defines a Joi schema object; specifies the expected shape 
// and rules for the incoming data (req.body).
const entrySchema = Joi.object({
  // title & entry: must be string, removes leading/trailing whitespace trim(),
  // and is mandatory (required()).
  title: Joi.string().trim().required(),
  entry: Joi.string().trim().required(),

  // location must be a string if provided, 
  // but allows it to be null (or omitted entirely)
  location: Joi.string().allow(null),

  // Tags may be omitted, but must be an array if provided,
  // and every item inside that array must be a string.
  gratitudeTags: Joi.array().items(Joi.string())

  // Rejects unexpected fields that aren't defined here.
  // userId, createdAt, or isEdited are server controlled.
}).unknown(false);

// Validates the request body before it reaches the controller.
const validateEntry = (req, res, next) => {
  // Destructures result into an error object (if validation fails)
  // and a value object (the cleaned/validated data).
  const { error, value } = entrySchema.validate(req.body, {
    // Allows Joi to collect multiple validation errors and return them
    // all at once.
    abortEarly: false
  });

  if (error) {
    // Halts execution and responds with an HTTP 400 (Bad Request) status code.
    return res.status(400).json({
      // General error message +
      // details contains Joi's specific error messages
      error: 'Invalid journal entry data.',
      details: error.details.map(detail => detail.message)
    });
  }

  // If successsful, overwrites re.body
  // Uses the validated and normalized value.
  req.body = value;

  // if successful, Express will continue to route controller.
  next();
};

module.exports = validateEntry;
