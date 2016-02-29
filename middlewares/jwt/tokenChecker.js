'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

module.exports = (() => {
    return (req, res, next) => {
        let token = undefined;
        let decodeToken;

        if(token){
            decodeToken = jwt.decode(token);
            if(decodeToken){
                //TODO
            }

            res.status(200).send(encrypt);
            next();
        }else{
            res.status(401).send(__('Not authorize'));
        }
    };
})();
