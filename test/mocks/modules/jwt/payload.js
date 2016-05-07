'use strict';

let mocks = () => {
};

mocks.configuration = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.correctUserFromRequest = mocks.configuration;

mocks.configurationUndefinedId = {
	username: 'UserNamePrueba'
};

mocks.userFromRequestWithUndefinedId = mocks.configurationUndefinedId;

mocks.configurationUndefinedUsername = {
	_id: '1'
};

mocks.userFromRequestWithUndefinedUsername = mocks.configurationUndefinedUsername;

mocks.payload = {
	_id: '1',
	username: 'UserNamePrueba',
	exp: new Date() + 1000
};

mocks.payloadIdUndefined = {
	username: 'UserNamePrueba',
	exp: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadUsernameUndefined = {
	_id: '1',
	exp: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadEncriptedUndefined = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.userJSON =  JSON.stringify(
	mocks.configuration
);

mocks.userJSONUndefinedId =  JSON.stringify([
	mocks.configurationUndefinedId
]);

mocks.userJSONUndefinedUsername = JSON.stringify([
	mocks.configurationUndefinedUsername
]);

mocks.configurationOfThePayload = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.configurationOfThePayloadTokenNotActive = {
	_id: '1',
	username: 'UserNamePrueba',
	nbf: Date.now() / 1000 + 1000
};

mocks.configurationOfThePayloadTokenExpired = {
	_id: '1',
	username: 'UserNamePrueba',
	exp: (Date.now() / 1000) - 1000
};

module.exports = mocks;
