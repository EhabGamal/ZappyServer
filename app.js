var bodyParser = require('body-parser'),
    express = require('express'),
    passport = require('passport');

var passConfig = require('./config/passport');
passport.use(passConfig.strategy);

var auth = require('./routes/auth'),
    index = require('./routes/index');

// Creating Express app object
var app = express();

// Using passport middleware for requests authentication
app.use(passport.initialize());
// Using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register available routes to the app
app.use('/login', auth);
app.use('/', index);

// Default handler for 404 requests
app.use(function (req, res, next) {
  res.status(404).send('Not Found!');
});

module.exports = app;
