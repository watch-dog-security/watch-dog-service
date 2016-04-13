'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let UserManager = require('./../../modules/users/user');

module.exports = (() => {
    return (req, res, next) => {
		let oUser;

		try {
			oUser = UserManager.parseJsonToUserModel(req);
		} catch (exception) {
			return res.status(exception.code).send(exception.message);
		}

        oUser.save((error)=>{
            if (error) {
                return res.status(500).send(error.message);
            }else{
                return res.status(200).send(__('User saved successfully'));
            }
        });
    };
})();
