'use strict';

module.exports = (() => {
	return (error, request, response, next) => {
		if(error){
			return response.status(error.code).send(error.message);
		}
		return next();
	};
})();
