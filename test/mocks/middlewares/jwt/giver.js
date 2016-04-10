'use strict';

let payload = require('./../../../../modules/jwt/payload.js');
let jwt = require('./../../../../modules/jwt/jwt.js');
let mocks = () => {};

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
	"_id": "1",
	"username": mocks.validUserToMongoose.username
};

mocks.invalidUser = {
	"_id": "2",
	"username": 'invalid'
};

mocks.undefinedUser = {
	"_id": "3",
	"username": 'invalid'
};

mocks.undefinedId = {
	"_id": undefined,
	"username": 'invalid'
};

mocks.validRequest = {
	signin: {
		user: mocks.validUser
	}
};

mocks.undefinedSingin = {
	signin: {
		undefined
	}
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

mocks.validPayload = payload.createPayload(mocks.validUser._id, mocks.validUser.username);

mocks.encriptedValidPayload = jwt.encrypt(mocks.validPayload);


module.exports = mocks;

