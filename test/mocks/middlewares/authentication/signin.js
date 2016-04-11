'use strict';

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

mocks.validAuthenticationHeader = 'Basic YWxiZXJ0b2lnOkVuam95V0RT==';

module.exports = mocks;
