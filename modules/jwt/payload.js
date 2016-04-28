'use strict';

const config = require('./../../config/server/config.js');
let appError = require('./../../modules/error/manager');

/**
 * Create a payload with the _id and the username if not correct will return an Error
 * @param _id
 * @param username
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
exports.createPayload = (_id, username) => {
		let payload = this.fillPayload(_id,username);

		if(!this.checkPayload(payload)){
			throw appError('WRONG_PAYLOAD');
		}
		return payload;
};

/**
 * Prepare payload with _id and username, this method generate the payload for JWT standard, this needs exp propery to
 * have control of the expiration time of the token. jwt-simple library defines these standard properties.
 * @param _id
 * @param username
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
exports.fillPayload = (_id, username) => {
	return {
		_id: _id,
		username: username,
		exp: new Date() + config.jwt.expire
	};
};

/**
 * Check if payload is empty
 * @param payload
 * @returns {boolean}
 */
exports.checkPayload = (payload) => {
    return !!( payload &&
	payload._id &&
    payload.username &&
    payload.exp);
};
