'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

module.exports = (() => {
	return (req, res, next) => {

		let userFromRequest = getUserFromRequest(req);

		UserManager.parseUserToPayload(userFromRequest).then((payload) => {
			let encrypt = jwt.encrypt(payload);
			res.status(200).send(encrypt);
			next();
		}).catch((error) => {
			res.status(error.code).send(error.message);
		});
	};
})();

let checkBody = (req) =>{
	return !!(req.body &&
			req.body.signin &&
			req.body.signin.user)
};

let getUserFromRequest = (req) => {
	if(checkBody(req)){
		return req.body.signin.user;
	}
	return undefined;
};
