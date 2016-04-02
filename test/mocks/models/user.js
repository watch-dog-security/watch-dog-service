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

mocks.validUserPhone = {
	fullName: 'Hugo Weaving',
	username: 'vendetta',
	password: 'venganza',
	meta: {
		birthdate: '04/04/1960'
	},
	email: 'hugo.weaving@gmail.com',
	mobilePhone: '121252333',
	codeCountry: '+44'
};

mocks.reapetedUserPhone = Object.assign({}, mocks.validUserPhone);
mocks.reapetedUserPhone.username = 'v-vendetta';
mocks.reapetedUserPhone.email = 'hugo.weaving@hotmail.com';

mocks.validUserCodeCountry = {
	fullName: 'Natalie Portman',
	username: 'portman',
	password: 'natalie',
	meta: {
		birthdate: '09/06/1981'
	},
	email: 'natalie.portman@gmail.com',
	mobilePhone: '999888444',
	codeCountry: '+972'
};

mocks.validUserSecondCodeCountry = {
	fullName: 'Stephen Fry',
	username: 'fry',
	password: 'Stephen',
	meta: {
		birthdate: new Date('24/08/1957')
	},
	email: 'stephen.fry@gmail.com',
	mobilePhone: '166252333',
	codeCountry: '+1-544'
};

mocks.validUserCreateAt = {
	fullName: 'Tom Hardy',
	username: 'tom',
	password: 'hardy',
	meta: {
		birthdate: new Date('15/09/1977')
	},
	email: 'tom.hardy@gmail.com',
	mobilePhone: '887744553',
	codeCountry: '+44'
};

mocks.validUserUpdateAt = {
	fullName: 'Idris Elba',
	username: 'idris',
	password: 'elba',
	meta: {
		birthdate: '07/09/1972'
	},
	email: 'idris.elba@gmail.com',
	mobilePhone: '757483848',
	codeCountry: '+44'
};

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

mocks.userWithoutPhone = {
	fullName: 'Hugo Weaving',
	username: 'vendetta',
	password: 'venganza',
	meta: {
		birthdate: '04/04/1960'
	},
	email: 'hugo.weaving@gmail.com',
	codeCountry: '+44'
};

mocks.userWithLettersOnMobile = {
	fullName: 'Hugo Weaving',
	username: 'vendetta',
	password: 'venganza',
	meta: {
		birthdate: '04/04/1960'
	},
	email: 'hugo.weaving@gmail.com',
	mobilePhone: '1212r2g33',
	codeCountry: '+44'
};

mocks.userWithoutFullname = {
	username: 'anonymous',
	password: 'anonymous',
	meta: {
		birthdate: '02/06/1988'
	},
	email: 'anonymous@gmail.com',
	mobilePhone: '56543456',
	codeCountry: '+34'
};

mocks.userWithoutCodeCountry = {
	fullName: 'Roger Allam',
	username: 'roger',
	password: 'allam',
	meta: {
		birthdate: '26/10/1953'
	},
	email: 'roger.allam@gmail.com',
	mobilePhone: '5454624565'
};

mocks.userWrongCodeCountry = {
	fullName: 'Stephen Rea',
	username: 'rea',
	password: 'stephen',
	meta: {
		birthdate: '31/10/1946'
	},
	email: 'stephen.rea@gmail.com',
	mobilePhone: '643464324',
	codeCountry: '972'
};

mocks.userWithoutPassword = {
	fullName: 'Gerard Butler',
	username: 'gerard',
	meta: {
		birthdate: '13/11/1969'
	},
	email: 'gerard.butler@gmail.com',
	mobilePhone: '767548394',
	codeCountry: '+44'
};

mocks.userWithoutBirthdate = {
	fullName: 'Mark Strong',
	username: 'mark',
	password: 'strong',
	email: 'mark.strong@gmail.com',
	mobilePhone: '998877445',
	codeCountry: '+44'
};

mocks.userWrongBirthdate = {
	fullName: 'Toby Kebbell',
	username: 'toby',
	password: 'kebbell',
	meta: {
		birthdate: '0206/1988'
	},
	email: 'toby.kebbell@gmail.com',
	mobilePhone: '95847583',
	codeCountry: '+44'
};

module.exports = mocks;
