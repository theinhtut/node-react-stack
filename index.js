const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

//Passport JS
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken) => {
    console.log(accessToken);
})
);

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

const port = process.env.PORT || 5000;

app.listen(port);
console.log('Server has started on port: ' + port);
