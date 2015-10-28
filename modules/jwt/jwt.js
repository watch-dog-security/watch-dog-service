'use strict';

let jwt = require('jwt-simple');
const config = require('./../../config.js');

exports.encrypt = (payload) => {
    let secret = config.jwt.secret;
    return jwt.encode(payload, secret);
};

exports.decrypt = (token) => {
    let secret = config.jwt.secret;
    return jwt.encode(token, secret);
};