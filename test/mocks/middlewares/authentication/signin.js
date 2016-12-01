'use strict';

const bodyParser = require('body-parser');
let signin = require('./../../../../middlewares/authentication/signin');
const appError = require('./../../../../modules/error/manager');
let errorHandler = require('./../../../../middlewares/error/handler');

let mocks = () => {};
let mocksUserModule = require('./../../modules/users/user');

mocks.validUserToMongoose = mocksUserModule.userJson;
mocks.validAuthenticationHeader = 'Basic YWxiZXJ0b2lnOjEyMzQ==';
mocks.invalidFormatedAuthenticationHeader = 'Basic cHJ1ZWJhOg==';
mocks.invalidAuthenticationHeader = 'Basic YWxiZXJ0b2l nOkVuam95V0RT==';
mocks.notExistAuthenticationHeader = 'Basic WWxiZ342b2tnOkVuam95V0RT==';


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
		name: 'signin',
		instance: signin
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
	}
];

module.exports = mocks;
