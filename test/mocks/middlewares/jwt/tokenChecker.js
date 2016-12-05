'use strict';

const mocksFromUsers = require('./../../modules/users/user');
const bodyParser = require('body-parser');
const tokenChecker = require('./../../../../middlewares/jwt/tokenChecker');
const appError = require('./../../../../modules/error/manager');
const errorHandler = require('./../../../../middlewares/error/handler');
let i18n = require('i18n');
let mocks = () => {
};

mocks.validUser = Object.assign({}, mocksFromUsers.userJson);
mocks.validUserForInvalidTokenOnRedis =  Object.assign({}, mocksFromUsers.userJsonValidTwo);
mocks.invalidUser = {
	'_id': '5',
	'username': 'tg5tgfdgsdf'
};

mocks.validToken = {
	id: '1',
	token: ''
};

mocks.notPresentTokenOnRedis = {
	id: '2',
	token: ''
};

mocks.invalidToken = {
	id: '3',
	token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzIiwidXNlcm5hbWUiOiJqb25zbm93In0.eugzBPPhiMd5m9hdPsfBW_8OH6GttHryJZaYTxZcUmE'
};

mocks.voidObject = {};

//TODO comes from mock jwt
mocks.tokenSignedWithOtherPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

mocks.voidStringToken = '';

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
		name: 'tokenChecker',
		instance: tokenChecker
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
