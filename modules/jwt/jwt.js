'use strict';

let jwt = require('jwt-simple');
const config = require('./../../config/server/config.js');

/**
 * Encrypt the payload to JWT enconde
 * @param payload
 * @returns {String}
 */
exports.encrypt = (payload) => {
    let secret = config.jwt.secret;
    return jwt.encode(payload, secret);
};

/**
 * Decode JWT passed to the function
 * @param token
 * @returns {Object}
 */
exports.decode = (token) => {
    let secret = config.jwt.secret;
    return jwt.decode(token, secret);
};

