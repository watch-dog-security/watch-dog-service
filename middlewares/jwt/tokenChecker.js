'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('../../modules/jwt/jwt');

module.exports = (() => {
    return (req, res, next) => {
		//TODO: coger el berarer del header
        let token = req.body;
		let redisInstance = req.app.get('redisInstance');
        let decodeToken;

        if(token){
            decodeToken = jwt.decode(token);
			//TODO: Check if exist on redis

			//TODO: IF exist, do the proxy

            res.status(200).send(encrypt);
            next();
        }else{
            res.status(401).send(__('Not authorize'));
        }
    };
})();
