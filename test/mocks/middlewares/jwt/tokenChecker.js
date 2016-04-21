'use strict';

const mocksFromUsers = require('./../../modules/users/user');

let mocks = () => {
};

mocks.validUser = Object.assign({}, mocksFromUsers.userJson);
mocks.validUserForInvalidTokenOnRedis =  Object.assign({}, mocksFromUsers.userJsonValidTwo);

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
	token: ''
};
mocks.voidObject = {};

mocks.voidStringToken = '';


module.exports = mocks;
