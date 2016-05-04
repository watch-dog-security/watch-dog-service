'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let appError = require('./../../modules/error/manager');
let UserManager;
let i18n;
let user;

module.exports = (() => {
	return (req, res, next) => {
		try {
			i18n = req.app.get('i18n');
			UserManager = req.app.get('UserManager');
			user = UserManager.parseJsonToUserModel(req.body);

			user.save((error) => {
				if (error) {
					let mongoappError = appError('MONGOOSE_USER_SAVE');
					mongoappError.message = error.message;
					return next(mongoappError);
				}
				return res.status(200).send(i18n.__('User saved successfully'));
			});
		} catch (error) {
			return next(error);
		}
	};
})();
