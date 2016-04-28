'use strict';

let UserManager = require('./../../modules/users/user');
let authentication = require('./../../modules/authentication/authentication');
let appError = require('./../../modules/error/manager');

module.exports = (() => {
	return (req, res, next) => {
		let authRequest = req.headers['authorization'];

		if (authentication.check(authRequest)) {
			try {
				let userAuthentication = authentication.getUserAuthentication(authRequest);

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

			} catch (exception) {
				return next(exception);
			}
		} else {
			return next(appError('INCORRECT_CREDENTIALS'));
		}
	};
})();
