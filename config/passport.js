var _ = require('lodash');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');

var config = require('../config/config');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = config.secret;

module.exports.strategy = new JwtStrategy(jwtOptions, (payload, next) => {
    var user = config.users[_.findIndex(config.users, { id: payload.id })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

module.exports.jwtOptions = jwtOptions;