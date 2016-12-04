'use strict';

let payload = require('./../../../../modules/jwt/payload.js');
let jwt = require('./../../../../modules/jwt/jwt.js');
const bodyParser = require('body-parser');
const errorHandler = require('./../../../../middlewares/error/handler');
const appError = require('./../../../../modules/error/manager');
const giver = require('./../../../../middlewares/jwt/giver');
let i18n = require('i18n');
let mocks = () => {};

i18n.configure({
	directory: __dirname + '/../../../config/locales',
	locales: ['en', 'es'],
	defaultLocale: 'en',
	register: global
});

mocks.validUserToMongoose = {
	fullName: 'Alberto Iglesias Gallego',
	username: 'albertoig',
	password: 'EnjoyWDS',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'alberto.uchiha@gmail.com',
	mobilePhone: '606554433',
	codeCountry: '+34'
};

mocks.validUser = {
	'_id': '1',
	'username': mocks.validUserToMongoose.username
};

mocks.invalidUser = {
	'_id': '2',
	'username': 'invalid'
};

mocks.undefinedUser = {
	'_id': '3',
	'username': 'invalid'
};

mocks.undefinedId = {
	'username': 'invalid'
};

mocks.validRequest = {
	signin: {
		user: mocks.validUser
	}
};

mocks.undefinedSingin = {
	signin: {}
};

mocks.undefinedSinginId = {
	signin: mocks.undefinedId
};

mocks.undefinedSinginUsername = {
	signin: mocks.undefinedUser
};

mocks.invalidRequest = {
	signin: {
		user: mocks.invalidUser
	}
};

mocks.validPayload = payload.fillPayload(mocks.validUser._id, mocks.validUser.username);

mocks.encriptedValidPayload = jwt.encrypt(mocks.validPayload);

i18n.configure({
	directory: __dirname + '/../../../config/locales',
	locales: ['en', 'es'],
	defaultLocale: 'en',
	register: global
});

mocks.dependencies = [
	{
		name: 'body-parser-json',
		instance: bodyParser.json()
	},
	{
		name: 'body-parser-url-encoded',
		instance: bodyParser.urlencoded({extended: true})
	},
	{
		name: 'giver',
		instance: giver
	},
	{
		name: 'error-handler',
		instance: errorHandler
	}
];

mocks.variables = [
	{
		name: 'appError',
		object: appError
	},
	{
		name: 'i18n',
		object: i18n
	}
];

module.exports = mocks;

