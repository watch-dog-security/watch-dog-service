'use strict';

let appError;

module.exports = (() => {
	return (req, res, next) => {
		appError = req.app.get('appError');

		if (Object.keys(req.body).length !== 0 && req.body && req.body !== 'null') {
			return next();
		}
		return next(appError('NO_DATA'));
	};
})();
