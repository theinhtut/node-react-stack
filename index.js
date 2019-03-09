const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // Schema Models
require('./services/passport');

// MongoDB Config
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB is now connected...'))
  .catch(err => console.log(err));

const app = express();

// Cookie Session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Bodyparser
// app.use(express.urlencoded({ extended: false }));

// Same with ===>
// const authRoutes = require('./routes/authRoutes');
// authRoutes(app);
require('./routes/authRoutes')(app);

// PORT delcaration
const port = process.env.PORT || 5000;
app.listen(port);
console.log('Server has started on port: ' + port);
