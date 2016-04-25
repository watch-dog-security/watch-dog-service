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
	if (!payload) {
		throw AppError('ENTRY_PAYLOAD');
	}

	try {
		return jwt.encode(payload, secret, algorithm);
	} catch (error) {
		if (error.message === 'Require key') {
			throw AppError('KEY_NOT_SUPPLIED');
		} else if (error.message === 'Algorithm not supported') {
			throw AppError('ALGORITHM_NOT_SUPPORTED');
		}
	}
};

/**
 * Decode JWT passed to the function
 * @param token
 * @returns {Object}
 */
exports.decode = (token) => {
	try {
		return jwt.decode(token, secret, false, algorithm);
	} catch (error) {
		if (error.message === 'Signature verification failed') {
			throw AppError('SIGNATURE_VERIFICATION');
		} else if (error.message === 'Token expired') {
			throw AppError('EXPIRED_TOKEN');
		} else if (error.message === 'Token not yet active') {
			throw AppError('TOKEN_NOT_ACTIVE');
		} else if (error.message === 'Algorithm not supported') {
			throw AppError('ALGORITHM_NOT_SUPPORTED');
		} else if (error.message === 'No token supplied') {
			throw AppError('TOKEN_NOT_SUPPLIED');
		}
	}
};

