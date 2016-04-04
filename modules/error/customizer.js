'use strict';

const errorsJSON = require('./../../config/errors/errors.json');

let AppError = (settings) => {
	var self = new Error(settings.message);
	if (self.__proto__) {
		self.__proto__ = AppError.protoype
	}

	self.code = settings.code;
	self.type = settings.type;
	self.id = settings.id;

	self.toString = () => {
		return '[' + self.type + ' Error]: ' +
			'\n - id: ' + self.id +
			'\n - message: ' + self.message +
			'\n - stacktrace: ' + self.stack;
	};

	return self;
};

AppError.prototype = Object.create(Error.prototype);

let getErrorByTag = (tag) => {
	let error = errorsJSON[tag];

	if (error != undefined) {
		return AppError(error);
	} else {
		let defaultError = errorsJSON['DEFAULT'];
		if(defaultError != undefined){
			return AppError(defaultError);
		}else{
			return AppError({
				"id": "0",
				"type": "UNEXPECTED",
				"code": "500",
				"message": "Error desconocido"
			})
		}
	}
};

module.exports = (tag) => {
	return (getErrorByTag(tag));
};
