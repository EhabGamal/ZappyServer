var express = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    Twitter = require('twitter');

const config = require('../config/config'),
    Schema = require('../model/schema');

// Connect to MongoDB using connection URL from config file
mongoose.connect(config.db);
var Tweet = mongoose.model('tweet', Schema.Tweet);

var router = express.Router();
// Creating twitter client object using tokens from config file
var client = new Twitter({
    consumer_key: config.socialAuth.twitter.consumer_key,
    consumer_secret: config.socialAuth.twitter.consumer_secret,
    access_token_key: config.socialAuth.twitter.access_token_key,
    access_token_secret: config.socialAuth.twitter.access_token_secret
});

// Creating middleware object of passport JWT for tweets GET requests authentication
var loggedIn = passport.authenticate('jwt', { session: false });
// Creating custome middleware object for Slack Outgoing Webhook requests authentiation
var isSlack = function (req, res, next) {
    if (!(req.body.token && req.body.trigger_word && req.body.text)) {
        return res.status(400).send('Bad Request! must provide token, text and trigger word.');
    } else if (req.body.token !== config.socialAuth.slack.token) {
        return res.status(401).send('Unauthorized!');
    }
    next();
};

router.route('/')
    /* POST Slack Outgoing Webhook. */
    .post(isSlack, function (req, res, next) {
        var body = req.body;
        // Split Slack message using whitespace
        body.text = body.text.split(' ');
        // Look for the trigger word index in the message words array
        var handel = body.text.indexOf(body.trigger_word);
        // Get twitter handle if valid trigger word
        // Trigger word is valid if it is a whole word (not part of word) and not at end of message
        handel = ~handel && body.text.length > handel ? body.text[++handel] : '';
        
        // If no handle was found then ignore the request
        if (!handel) {
            return res.status(400).send('Bad Request! Empty twitter handel.');
        }

        // Twitter API query params
        var params = {
            screen_name: handel
        };
        // Calling twitter client with the provided handle and get the user public tweets
        client.get('statuses/user_timeline.json', params, function (err, tweets, response) {
            // Error, probably invalid handle or invalid tokens
            if (err) {
                return res.status(400).send('Bad Request! Invalid twitter handel.');
            }
            // Loop over tweets and add or update if existed
            tweets.forEach(tweet => {
                var query = {
                    'id': tweet.id
                };
                var options = {
                    upsert: true
                };

                Tweet.findOneAndUpdate(query, tweet, options, function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            // Respond with the number of tweets received from Twitter response
            res.status(200).send({
                text: `Retrieved ${tweets.length} tweets from ${params.screen_name}`
            });
        });
    })
    // GET stored tweets from database
    .get(loggedIn, (req, res, next) => {
        // Get all saved tweets from the database
        Tweet.find({}, function (err, docs) {
            if (err) {
                next();
            }
            if (!docs.length) {
                return res.status(204).send({ message: 'No Tweets Found in the Database!' });
            }
            res.status(200).send(docs);
        });
    });

module.exports = router;
