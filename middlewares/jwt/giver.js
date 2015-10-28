'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt')

module.exports = (() => {
    return (req, res, next) => {
        let payload = UserManager.getPayload(req.signin.user);
        let encrypt = jwt.encrypt(payload);
        res.status(200).send(encrypt);
        next();
    };
})();