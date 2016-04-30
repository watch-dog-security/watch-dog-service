'use strict';

let appError = require('./../error/manager');

/**
 * Check if the auth header is void.
 * @param authorizationHeader
 * @returns {boolean}
 */
exports.check = (authorizationHeader) => {
	return !!(authorizationHeader && authorizationHeader.trim() !== '');
};

/**
 * Decode and get the user information on the header auth
 * @param authorizationHeader
 * @returns {{username, password}|{username: *, password: *}}
 */
exports.getUserAuthentication = (authorizationHeader) => {
	try {
		let decodedAuthHeader = this.decode(authorizationHeader);
		return this.parseAuthRequestToUserModel(decodedAuthHeader);
	} catch (exception) {
		throw exception;
	}
};

/**
 * Decode base64 auth header from request if is undefined or the formation is not correct will throw and exception
 * @param authorizationHeader
 */
exports.decode = (authorizationHeader) => {
	if (authorizationHeader) {
		let authorizationHeaderSplitedLenght = authorizationHeader.split(' ').length;

		if (authorizationHeaderSplitedLenght !== 2 ||
			!authorizationHeaderSplitedLenght) {
			throw this.getAuthenticationException();
		} else {
			let authorizationHeaderSplited = authorizationHeader.split(' ');
			let buffer = new Buffer(authorizationHeaderSplited[1], 'base64');
			return buffer.toString();
		}
	} else {
		throw this.getAuthenticationException();
	}
};

/**
 * Check if the authorization header is correct and return the user information.
 * If not will throw and exception
 * @param authorizationHeader
 * @returns {{username: *, password: *}}
 */
exports.parseAuthRequestToUserModel = (authorizationHeader) => {
	if (!authorizationHeader ||
		authorizationHeader.indexOf(':') === -1
	) {
		throw this.getAuthenticationException();
	} else {
		let authorizationHeaderSplited = authorizationHeader.split(':');
		return {
			username: authorizationHeaderSplited[0],
			password: authorizationHeaderSplited[1]
		};
	}
};

/**
 * Return a cunstom error AUTH_HEADER_NOT_CORRECT
 * @returns {appError}
 */
exports.getAuthenticationException = () => {
	return appError('AUTH_HEADER_NOT_CORRECT');
};
