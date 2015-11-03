'use strict';

let jwt = require('jwt-simple');
const config = require('./../../config/server/config.js');

exports.encrypt = (payload) => {
    let secret = config.jwt.secret;
    return jwt.encode(payload, secret);
};

exports.decode = (token) => {
    let secret = config.jwt.secret;
    return jwt.decode(token, secret);
};

