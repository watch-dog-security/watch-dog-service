'use strict';

let UserManager = require('./../../modules/users/user');
let authentication = require('./../../modules/authentication/authentication');

module.exports = (() => {
	return (req, res, next) => {
		let authRequest = req.headers['authorization'];

		if (authentication.check(authRequest)) {
			let userAuthentication;

			try {
				userAuthentication = authentication.getUserAuthentication(authRequest);
			} catch (exception) {
				return res.status(exception.code).send(exception.message);
			}

			UserManager.checkUserFromDB(userAuthentication).then((user)=> {
					if (user.length !== 0) {
						req.body.signin = {user: JSON.stringify(user)};
						return next();
					} else {
						return res.status(401).send(__('You must to signin on the system with the correct credentials'));
					}
				})
				.catch((error) => {
					return res.status(error.code).send(error.message);
				});
		} else {
			return res.status(401).send(__('You must to signin on the system with the correct credentials'));
		}
	};
})();
