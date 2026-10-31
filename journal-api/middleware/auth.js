/*
 Auth0 authentication middleware:

 - Connects Express app to Auth0
 - Automatically provides /login, /logout, and /callback routes.
 - Maintains authenticate user's session using an encrypted cookie.
 - Makes authentication info available through req.oidc.

 - authRequired: false - authentication is not automatically 
 - required for every route. Must protect /entries routes separately. */


// Imports Auth0 authentication middleware.
// auth() manages login process, callback, logout, and user session.
const { auth } = require('express-openid-connect');

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

module.exports = auth(authConfig);