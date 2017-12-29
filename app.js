var bodyParser = require('body-parser');
var express = require('express');

// Creating Express app object
var app = express();

// Using bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Default handler for 404 requests
app.use(function (req, res, next) {
  res.status(404).send('Not Found!');
});

module.exports = app;
