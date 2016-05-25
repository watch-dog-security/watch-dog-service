'use strict';

let appError = require('./../../modules/error/manager');

module.exports = (() => {
	return (req, res, next) => {
		if (Object.keys(req.body).length !== 0) {
			return next();
		}
		return next(appError('NO_DATA'));
	};
})();
