'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('./../../modules/jwt/jwt');
let AppError = require('./../../modules/error/manager');

module.exports = (() => {
    return (req, res, next) => {
        let token = req.headers['token'];
		let redisInstance = req.app.get('redisInstance');
		let appError;

        if(token){
            let decodeToken = jwt.decode(token);
			//TODO: check on mongodb
			redisInstance.get(decodeToken._id.toString(), (error, reply) => {
				if(error || (error === null && reply === null)){
					appError = AppError('TOKEN_NOT_VALID');
					return res.status(appError.code).send(appError.message);
				}
				return next();
			});
        }else{
			appError = AppError('TOKEN_NOT_PRESENT');
            return res.status(appError.code).send(appError.message);
        }
    };
})();
