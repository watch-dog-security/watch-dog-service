'use strict';

const config = require('./../../config/server/config.js');

exports.createPayload = (username, created_at, updated_at) =>{
    return {
        username: username,
        created_at: created_at,
        updated_at: updated_at
    }
};