const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll /*
    #swagger.description = 'Retrieve a list of all temples in the database.'
        #swagger.parameters['apiKey'] = {
      in: 'header',
      required: true,
      type: 'string',
      description: 'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N'
}*/);
routes.get('/:temple_id', temples.findOne /*#swagger.description = 'Retrieve a specific temple by ID.'*/);

routes.post('/', temples.create /*#swagger.description = 'Create a new temple entry in the database.'*/);

module.exports = routes;
