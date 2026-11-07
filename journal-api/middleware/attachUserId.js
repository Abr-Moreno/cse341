/*
MAIN IDEA:
==========
- Express middleware: 
- Extracts user identity and attaches it to the request object 
- BEFORE the controller executes.
=====================================================================
=====================================================================*/

const attachUserId = (req, res, next) => {
    req.userId = req.oidc.user.sub;
    next();
};

module.exports = attachUserId;