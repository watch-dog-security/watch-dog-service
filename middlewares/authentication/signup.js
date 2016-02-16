'use strict';

/**
 * @api {post} /auth/signup/ Creates a new user.
 * @apiVersion 0.1.0
 * @type {UserManager|exports|module.exports}
 */

let UserManager = require('./../../modules/users/user');

module.exports = (() => {
    return (req, res, next) => {

        let oUser = UserManager.parseJsonToUserModel(req);

        oUser.save((err)=>{
            if (err) {
                res.status(500).send('Something is going wrong');
            }else{
                res.status(200).send('User saved successfully!');
                next();
            }
        });
    };
})();