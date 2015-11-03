'use strict';

const config = require('./../../config/server/config.js');

exports.check = (authorizationHeader) => {
    return !!(authorizationHeader !== undefined && authorizationHeader.trim() !== '');
};

exports.getUserAuthentication = (authorizationHeader) => {
    let decodedAuthHeader = this.decode(authorizationHeader);
    return this.parseAuthRequestToUserModel(authorizationHeader);
};

exports.decode = (authorizationHeader) => {
    let authorizationHeaderSplited = authorizationHeader.split(' ');
    let buffer = new Buffer(authorizationHeaderSplited[1], 'base64');
    return buffer.toString();
};

exports.parseAuthRequestToUserModel = (authorizationHeader) => {
    let authorizationHeaderSplited = authorizationHeader.split(':');
    return {
        username: authorizationHeaderSplited[0],
        password: authorizationHeaderSplited[1]
    }
};