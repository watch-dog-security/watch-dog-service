'use strict';

let mocks = () => {
};

mocks.optionsVerified = {
	username: 'prueba',
	password: 'prueba'
};

mocks.userOptions = {
	username: 'prueba',
	password: 'prueba'
};

mocks.userOptionsNoExist = {
	username: 'pruebaadfasdf2',
	password: 'prueasdfadsfba2'
};

mocks.userOptionsUserNameNotCorrect = {
	userName: 'prueba',
	password: 'prueba'
};

mocks.userOptionsUserNameUndefined = {
	password: 'prueba'
};

mocks.userOptionsPasswordNotCorrect = {
	username: 'prueba',
	paSSword: 'prueba'
};

mocks.userOptionsPasswordUndefined = {
	username: 'prueba'
};

mocks.userJson = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '+34'
};

mocks.userJsonValidTwo = {
	fullname: 'Carlos Iglesias',
	username: 'carlosig',
	password: '5678',
	birthdate: '01/01/2001',
	email: 'carlos.uchiha@gmail.com',
	mobilephone: '4453564334',
	codecountry: '+34'
};

mocks.userJSONUndefinedUsername = {
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '+34'
};

mocks.userOptionsJson = {
	username: 'albertoig',
	password: '1234'
};

mocks.userJsonPrueba = {
	fullname: 'Alberto Iglesias',
	username: 'prueba',
	password: 'prueba',
	birthdate: '01/01/2001',
	email: 'alberto.uchihaaaa@gmail.com',
	mobilephone: '66655545544',
	codecountry: '+34'
};

mocks.userJsonFullNameFormation = {
	fullName: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonFullNameIsUndefined = {
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonPasswordFormation = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	paSSword: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonPasswordIsUndefined = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonUserNameFormation = {
	fullname: 'Alberto Iglesias',
	userName: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonUserNameIsUndefined = {
	fullname: 'Alberto Iglesias',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonEmailFormation = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	Email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonEmailIsUndefined = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonCodeCountryFormation = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	Codecountry: '34'
};

mocks.userJsonCodeCountryIsUndefined = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444'
};

mocks.userJsonMobilePhoneFormation = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobiLephone: '666555444',
	codecountry: '34'
};

mocks.userJsonMobilePhoneIsUndefined = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	codecountry: '34'
};

mocks.userJsonBirthdateFormation = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	Birthdate: '01/01/2001',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.userJsonBirthdateIsUndefined = {
	fullname: 'Alberto Iglesias',
	username: 'albertoig',
	password: '1234',
	email: 'alberto.uchiha@gmail.com',
	mobilephone: '666555444',
	codecountry: '34'
};

mocks.correctUser = {
	fullName: mocks.userJson.fullname,
	username: mocks.userJson.username,
	password: mocks.userJson.password,
	meta: {
		birthdate: mocks.userJson.birthdate
	},
	email: mocks.userJson.email,
	mobilePhone: mocks.userJson.mobilephone,
	codeCountry: mocks.userJson.codecountry
};

module.exports = mocks;
