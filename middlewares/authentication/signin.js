'use strict';

let authentication = require('./../../modules/authentication/authentication');
let appError = require('./../../modules/error/manager');
let authRequest;
let userAuthentication;
let UserManager;

module.exports = (() => {
	return (req, res, next) => {
		authRequest = req.headers['authorization'];
		UserManager = req.app.get('UserManager');

		if (authentication.check(authRequest)) {
			try {
				userAuthentication = authentication.getUserAuthentication(authRequest);

				UserManager.checkUserFromDB(userAuthentication)
					.then((user) => {
						if (user !== null && user.length !== 0) {
							req.body.signin = {user: user};
							return next();
						} else {
							throw appError('INCORRECT_CREDENTIALS');
						}
					})
					.catch((error) => {
						return next(error);
					});

			} catch (error) {
				return next(error);
			}
		} else {
			return next(appError('INCORRECT_CREDENTIALS'));
		}
	};
})();
