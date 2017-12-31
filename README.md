# ZappyServer
## The Pain Killer

The NodeJS back-end server of the Zappy App
The server pulls tweets from Twitter account based on [Slack Outgoing WebHooks](https://api.slack.com/custom-integrations/outgoing-webhooks) request and store the tweets to [MongoDB](https://www.mongodb.com/).

## Production Server

The app is deployed on [Heroku](https://zappytpk.herokuapp.com/). Check the Angular [Demo](https://zappy-tpk.firebaseapp.com).

## Development server

1. Clone the repo on your machine
2. Run `npm install` to install required dependencies
3. Run `npm start` for a dev server. Navigate to `http://localhost:3000/`

## Prerequisites

1. NodeJS v8.9.3 LTS
2. MongoDB
3. Update `config/config.js` with the MongoDB connection string URI if needed
4. Create [Twitter App Token](https://apps.twitter.com) and put it in `config.js` file.