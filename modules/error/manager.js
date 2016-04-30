'use strict';

const errorsJSON = require('./../../config/errors/errors.json');
const i18n = require('i18n');

i18n.configure({
	directory: __dirname + '/../../config/locales',
	locales: ['en', 'es'],
	defaultLocale: 'en',
	register: global
});

/**
 * Create a custom Error with a code, type, stacktrace id and custom message. Have a custom function to convert
 * everything toString.
 * @param settings
 * @returns {Error}
 * @constructor
 */
let appError = (settings) => {
	var self = new Error(i18n.__(settings.message));
	self.__proto__ = appError.protoype;
	self.code = settings.code;
	self.type = i18n.__(settings.type);
	self.id = settings.id;

	self.toString = () => {
		return '[' + self.type + ' Error]: ' +
			'\n - id: ' + self.id +
			'\n - message: ' + self.message +
			'\n - stacktrace: ' + self.stack;
	};

	return self;
};

appError.prototype = Object.create(Error.prototype);

/**
 * Get a custom error by tag defined on config/errors/errors.json everything have a i18N translations. If json is not present
 * the function will return a default error.
 * @param tag
 * @returns {Error}
 */
let getErrorByTag = (tag) => {
	let error = errorsJSON[tag];

	if (error) {
		return appError(error);
	} else {
		let defaultError = errorsJSON['DEFAULT'];
		if(defaultError){
			return appError(defaultError);
		}else{
			return appError({
				'id': '0',
				'type': 'UNEXPECTED',
				'code': '500',
				'message': 'Unexpected error, please contact with admin service'
			});
		}
	}
};

module.exports = (tag) => {
	return (getErrorByTag(tag));
};
