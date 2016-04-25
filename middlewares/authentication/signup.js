'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let UserManager = require('./../../modules/users/user');
let AppError = require('./../../modules/error/manager');

module.exports = (() => {
	return (req, res, next) => {
		try {
			let oUser = UserManager.parseJsonToUserModel(req.body);

			oUser.save((error)=> {
				if (error) {
					let mongoAppError = AppError('MONGOOSE_USER_SAVE');
					mongoAppError.message = error.message;
					return next(mongoAppError);
				}
				return res.status(200).send(__('User saved successfully'));
			});
		} catch (exception) {
			return next(exception);
		}
	};
})();
