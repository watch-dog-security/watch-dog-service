'use strict';

const bodyParser = require('body-parser');
const emptyBody = require('./../../../../middlewares/helper/emptyBody');
const appError = require('./../../../../modules/error/manager');
const errorHandler = require('./../../../../middlewares/error/handler');
let i18n = require('i18n');
let mocks = () => {};

mocks.nullVariable = null;
mocks.emptyObject = {};
mocks.emptyString = '';
mocks.body = 'something to send';

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
		name: 'emptyBody',
		instance: emptyBody
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
