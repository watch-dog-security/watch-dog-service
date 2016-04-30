'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let UserManager = require('./../../modules/users/user');
let appError = require('./../../modules/error/manager');
let i18n;

module.exports = (() => {
	return (req, res, next) => {
		try {
			i18n = req.app.get('i18n');
			let oUser = UserManager.parseJsonToUserModel(req.body);

			oUser.save((error) => {
				if (error) {
					let mongoappError = appError('MONGOOSE_USER_SAVE');
					mongoappError.message = error.message;
					return next(mongoappError);
				}
				return res.status(200).send(i18n.__('User saved successfully'));
			});
		} catch (exception) {
			return next(exception);
		}
	};
})();
