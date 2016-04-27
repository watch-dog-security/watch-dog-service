'use strict';

let AppError = require('./../../modules/error/manager');

/**
 * Create a payload with the _id and the username if not correct will return an Error
 * @param _id
 * @param username
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
exports.createPayload = (_id, username) =>{
		let payload = this.fillPayload(_id,username);

		if(!this.checkPayload(payload)){
			throw AppError('WRONG_PAYLOAD');
		}
		return payload;
};

/**
 * Prepare payload with _id and username
 * @param _id
 * @param username
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
exports.fillPayload = (_id, username) =>{
	return {
		_id: _id,
		username: username,
		encripted_at: new Date()
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
    payload.encripted_at);
};
