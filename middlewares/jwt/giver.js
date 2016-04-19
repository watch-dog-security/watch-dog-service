'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

module.exports = (() => {
	return (req, res, next) => {

		let userFromRequest = getUserFromRequest(req);
		let redisInstance = req.app.get('redisInstance');

		UserManager.parseUserToPayload(userFromRequest).then((payload) => {
			let encryptedJWT = jwt.encrypt(payload);

			redisInstance.set(payload._id.toString() , encryptedJWT);

			return res.status(200).send(encryptedJWT);
		}).catch((error) => {
			return res.status(error.code).send(error.message);
		});
	};
})();

let getUserFromRequest = (req) => {
	if(checkBody(req)){
		return req.body.signin.user;
	}
	return undefined;
};

let checkBody = (req) =>{
	return !!(req.body &&
	req.body.signin &&
	req.body.signin.user)
};
