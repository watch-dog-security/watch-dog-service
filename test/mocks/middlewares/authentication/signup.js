'use strict';

let mocks = () => {};
const bodyParser = require('body-parser');
const signup = require('./../../../../middlewares/authentication/signup');
const appError = require('./../../../../modules/error/manager');
const errorHandler = require('./../../../../middlewares/error/handler');
let i18n = require('i18n');

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
		name: 'signup',
		instance: signup
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
