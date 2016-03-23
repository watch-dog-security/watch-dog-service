'use strict';

const config = require('./../../config/server/config.js');

exports.check = (authorizationHeader) => {
	return !!(authorizationHeader !== undefined && authorizationHeader.trim() !== '');
};

exports.getUserAuthentication = (authorizationHeader) => {
	try {
		let decodedAuthHeader = this.decode(authorizationHeader);
		return this.parseAuthRequestToUserModel(decodedAuthHeader);
	} catch (exception) {
		throw exception;
	}
};

exports.decode = (authorizationHeader) => {
	if (authorizationHeader !== undefined) {
		let authorizationHeaderSplitedLenght = authorizationHeader.split(' ').length;

		if (authorizationHeaderSplitedLenght !== 2 ||
			authorizationHeaderSplitedLenght === undefined) {
			throw new Error(__('Authorization header is not correct'));
		} else {
			let authorizationHeaderSplited = authorizationHeader.split(' ');
			let buffer = new Buffer(authorizationHeaderSplited[1], 'base64');
			return buffer.toString();
		}
	} else {
		throw this.getAuthenticationException();
	}
};

exports.parseAuthRequestToUserModel = (authorizationHeader) => {
	if (authorizationHeader === undefined ||
		authorizationHeader.indexOf(':') === -1
	) {
		throw this.getAuthenticationException();
	} else {
		let authorizationHeaderSplited = authorizationHeader.split(':');
		return {
			username: authorizationHeaderSplited[0],
			password: authorizationHeaderSplited[1]
		}
	}
};

exports.getAuthenticationException = () => {
	return new Error(__('Authorization header is not correct'));
};
