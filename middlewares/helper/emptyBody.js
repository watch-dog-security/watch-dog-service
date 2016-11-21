'use strict';

let appError = require('./../../modules/error/manager');

module.exports = (() => {
	return (req, res, next) => {
		if (Object.keys(req.body).length !== 0 && req.body && req.body !== 'null') {
			console.log('pasa2');
			return next();
		}
		console.log('pasa3');
		return next(appError('NO_DATA'));
	};
})();
