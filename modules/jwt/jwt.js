'use strict';

let jwt = require('jwt-simple');
let appError = require('./../../modules/error/manager');

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
		throw appError('ENTRY_PAYLOAD');
	}

	try {
		return jwt.encode(payload, secret, algorithm);
	} catch (error) {
		if (error.message === 'Require key') {
			throw appError('KEY_NOT_SUPPLIED');
		} else if (error.message === 'Algorithm not supported') {
			throw appError('ALGORITHM_NOT_SUPPORTED');
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
			throw appError('SIGNATURE_VERIFICATION');
		} else if (error.message === 'Token expired') {
			throw appError('EXPIRED_TOKEN');
		} else if (error.message === 'Token not yet active') {
			throw appError('TOKEN_NOT_ACTIVE');
		} else if (error.message === 'Algorithm not supported') {
			throw appError('ALGORITHM_NOT_SUPPORTED');
		} else if (error.message === 'No token supplied') {
			throw appError('TOKEN_NOT_SUPPLIED');
		}
	}
};

