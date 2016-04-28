'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

let getUserFromRequest = (req) => {
	if (checkBody(req)) {
		return req.body.signin.user;
	}
	return undefined;
};

let checkBody = (req) => {
	return !!(req.body &&
	req.body.signin &&
	req.body.signin.user)
};

module.exports = (() => {
	return (req, res, next) => {
		let userFromRequest = getUserFromRequest(req);
		let redisInstance = req.app.get('redisInstance');

		try {
			let payload = UserManager.parseUserToPayload(userFromRequest);
			let encryptedJWT = jwt.encrypt(payload);
			redisInstance.set(payload._id.toString(), encryptedJWT);
			return res.status(200).send(encryptedJWT);
		} catch (exception) {
			return next(exception);
		}
	};
})();
