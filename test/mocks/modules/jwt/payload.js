'use strict';

let mocks = () => {
};

mocks.configuration = {
	_id: '1',
	userName: 'UserNamePrueba'
};

mocks.configurationUndefinedId = {
	_id: undefined,
	userName: 'UserNamePrueba'
};

mocks.configurationUndefinedUsername = {
	_id: '1',
	userName: undefined
};

mocks.payload = {
	_id: '1',
	username: 'UserNamePrueba',
	encripted_at: new Date()
};

mocks.payloadIdUndefined = {
	_id: undefined,
	username: 'UserNamePrueba',
	encripted_at: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadUsernameUndefined = {
	_id: '1',
	username: undefined,
	encripted_at: 'Sat Mar 26 2016 23:41:43 GMT+0100 (CET)'
};

mocks.payloadEncriptedUndefined = {
	_id: '1',
	username: 'UserNamePrueba',
	encripted_at: undefined
};

mocks.userJSON =  JSON.stringify([
	mocks.configuration
]);

mocks.userJSONUndefinedId =  JSON.stringify([
	mocks.configurationUndefinedId
]);

mocks.userJSONUndefinedUsername = JSON.stringify([
	mocks.configurationUndefinedUsername
]);

module.exports = mocks;
