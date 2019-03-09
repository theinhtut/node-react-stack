const passport = require('passport');

module.exports = app => {
  //Login Route
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // Callback URL
  app.get('/auth/google/callback', passport.authenticate('google'));


  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  //Logout routes
  app.get('/api/logout', (req, res) => {
      req.logout();
      res.send(req.user);
  });

};
