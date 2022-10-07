const checkAbob = (req, res, next) => {
  if (req.session.newUser === 'Abob') {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = { checkAbob };
