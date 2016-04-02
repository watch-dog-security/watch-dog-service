'use strict';

let mocks = () => {};

mocks.validUserEmail = {
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

mocks.validUserUsername = {
	fullName: 'Ryan Reynolds',
	username: 'deadpool',
	password: 'critic',
	meta: {
		birthdate: '08/02/2016'
	},
	email: 'ryan.reynols@gmail.com',
	mobilePhone: '111222333',
	codeCountry: '+1'
};

mocks.reapetedUserUsername = mocks.validUserUsername;

mocks.userWithoutEmail = {
	fullName: 'Mr.Robot',
	username: 'mrrobot',
	password: 'ImCr4zy',
	meta: {
		birthdate: '12/05/1981'
	},
	mobilePhone: '606554433',
	codeCountry: '+34'
};

mocks.userWrongEmail = {
	fullName: 'Christian Bale',
	username: 'cristbale',
	password: 'AmericanPsyc0',
	meta: {
		birthdate: '30/01/1974'
	},
	email: 'christian.balegmail.com',
	mobilePhone: '617913444',
	codeCountry: '+1'
};

mocks.userWithoutUsername = {
	fullName: 'Alberto Iglesias Gallego',
	password: 'EnjoyWDS',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'alberto.uchiha@gmail.com',
	mobilePhone: '606554433',
	codeCountry: '+34'
};

mocks.userWithoutPhone = {
	fullName: 'Alberto Iglesias Gallego',
	username: 'albertoig',
	password: 'EnjoyWDS',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'alberto.uchiha@gmail.com',
	codeCountry: '+34'
};

mocks.userWithoutCodeCountry = {
	fullName: 'Alberto Iglesias Gallego',
	username: 'albertoig',
	password: 'EnjoyWDS',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'alberto.uchiha@gmail.com',
	mobilePhone: '606554433'
};

module.exports = mocks;
