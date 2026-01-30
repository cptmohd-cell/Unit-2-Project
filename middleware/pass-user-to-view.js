/**
 * View Helper middleware
 * Makes user session data available to all EJS templates via res.locals
 */
const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};

module.exports = passUserToView;