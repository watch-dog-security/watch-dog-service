'use strict';

let mocks = () => {};

mocks.validUser = {
	fullName: 'Alberto Iglesias Gallego',
	userName: 'albertoig',
	password: 'EnjoyWD8',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'alberto.uchiha@gmail.com',
	mobilePhone: '606554433',
	codeCountry: '+34'
};

mocks.userWithoutEmail = {
	fullName: 'Mr.Robot',
	userName: 'mrrobot',
	password: 'ImCr4zy',
	meta: {
		birthdate: '12/05/1981'
	},
	email: 'sami.malek@gmail.com',
	mobilePhone: '606554433',
	codeCountry: '+34'
};

mocks.userWrongEmail = {
	fullName: 'Christian Bale',
	userName: 'cristbale',
	password: 'AmericanPsyc0',
	meta: {
		birthdate: '30/01/1974'
	},
	email: 'christian.balegmail.com',
	mobilePhone: '617913444',
	codeCountry: '+1'
};

module.exports = mocks;
