const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findById(id).then(user => {
    done(null, user);
  });
});

//Passport JS
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(existingUser => {
          if (existingUser) {
            // User already registered
            done(null, existingUser);
            console.log('User Existed');
          } else {
            // New User and register
            new User({ googleId: profile.id }).save()
            .then(user => done(null, user));
            console.log('New User registered');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);
