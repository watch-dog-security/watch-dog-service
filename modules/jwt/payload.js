'use strict';

let AppError = require('./../../modules/error/manager');

/**
 * Prepare payload with _id and username
 * @param _id
 * @param username
 * @returns {{_id: *, username: *, encripted_at: Date}}
 */
exports.createPayload = (_id, username) =>{
    return {
        _id: _id,
        username: username,
        encripted_at: new Date()
    };
};

/**
 * Create a payload with the _id and the username if not correct will return an Error
 * @param _id
 * @param username
 * @returns {Promise}
 */
exports.createPayloadVerifiedPromise = (_id, username) =>{
	return new Promise((resolve, reject) => {
		let payload = this.createPayload(_id,username);

		if(this.checkUndefinedPayload(payload)){
			resolve(payload);
		}else{
			reject(
				AppError('WRONG_PAYLOAD')
			);
		}
	});
};

/**
 * Check if payload is empty
 * @param payload
 * @returns {boolean}
 */
exports.checkUndefinedPayload = (payload) => {
    return !!( payload &&
	payload._id &&
    payload.username &&
    payload.encripted_at);
};
