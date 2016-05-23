'use strict';

let appError = require('./../../modules/error/manager');

module.exports = (() => {
	return (req, res, next) => {
		try {

		} catch (error) {
			return next(error);
		}
	};
})();
