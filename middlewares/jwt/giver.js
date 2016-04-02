'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

module.exports = (() => {
	return (req, res, next) => {
		UserManager.parseUserToPayload(req.body.signin.user).then((payload) => {
			let encrypt = jwt.encrypt(payload);
			res.status(200).send(encrypt);
			next();
		}).catch((error) => {
			res.status(401).send(error.message);
		});
	};
})();
