'use strict';

let jwt = require('jwt-simple');
let AppError = require('./../../modules/error/manager');

const config = require('./../../config/server/config.js');
const algorithm = config.jwt.algorithm;
const secret = config.jwt.secret;

/**
 * Encrypt the payload to JWT enconde
 * @param payload
 * @returns {String}
 */
exports.encrypt = (payload) => {
	return jwt.encode(payload, secret, algorithm);
};

/**
 * Decode JWT passed to the function
 * @param token
 * @returns {Object}
 */
exports.decode = (token) => {
	try {
		return jwt.decode(token, secret, algorithm);
	} catch (error) {
		if (error.message === 'Signature verification failed') {
			return AppError('SIGNATURE_VERIFICATION');
		} else if (error.message === 'Token expired') {
			return AppError('EXPIRED_TOKEN');
		} else if (error.message === 'Token not yet active') {
			return AppError('TOKEN_NOT_ACTIVE');
		} else if (error.message === 'Algorithm not supported') {
			return AppError('ALGORITHM_NOT_SUPPORTED');
		} else if (error.message === 'No token supplied') {
			return AppError('TOKEN_NOT_SUPPLIED');
		}
	}
};

