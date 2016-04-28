'use strict';

let jwt = require('./../../modules/jwt/jwt');
let AppError = require('./../../modules/error/manager');

module.exports = (() => {
    return (req, res, next) => {
        let token = req.headers['token'];
		let redisInstance = req.app.get('redisInstance');

		try{
            let decodeToken = jwt.decode(token);

			redisInstance.get(decodeToken._id.toString(), (error, reply) => {
				if(error || (error === null && reply === null)){
					return next(AppError('TOKEN_NOT_VALID'));
				}
				return next();
			});
		}catch(exception){
			return next(exception);
		}
    };
})();
