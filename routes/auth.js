var _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    express = require('express'),
    
    config = require('../config/config'),
    passConfig = require('../config/passport');

// Creating router object to handle auth routes
var router = express.Router();

router.route('/')
    .post((req, res, next) => {
        // Reject the auth request if no credetials provided
        if (!req.body.name || !req.body.password) {
            return res.status(403).send("Access Forbidden!");
        }

        // Check if username exists in users list from config file
        // TODO: move auth users to database and add signup functionality
        var user = config.users[_.findIndex(config.users, { name: req.body.name })];
        if (!user) {
            return res.status(401).send("Invalid Username or Password!");
        }

        if (user.password === req.body.password) {
            var payload = { id: user.id };
            // Create JWT Token for the user to be used in requests
            var token = jwt.sign(payload, passConfig.jwtOptions.secretOrKey);
            res.status(200).send({ message: "Authenticated Successfully", token: token });
        } else {
            res.status(401).send("Invalid Username or Password!");
        }
    });

module.exports = router;
