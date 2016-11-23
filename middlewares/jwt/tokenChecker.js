'use strict';

let jwt = require('./../../modules/jwt/jwt');
let appError;

module.exports = (() => {
    return (req, res, next) => {
        let token = req.headers['token'];
		let redisInstance = req.app.get('redisInstance');
		let appError = req.app.get('appError');

		try{
            let decodeToken = jwt.decode(token);

			redisInstance.get(decodeToken._id.toString(), (error, reply) => {
				if(error || (error === null && reply === null)){
					return next(appError('TOKEN_NOT_VALID'));
				}
				return next();
			});
		}catch(exception){
			return next(exception);
		}
    };
})();
