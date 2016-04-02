'use strict';

const config = require('./../../config/server/config.js');
const mockUserModel = require('./../mocks/models/user.js');
const mongoose = require('mongoose');
const i18n = require("i18n");
const express = require('express');

let assert = require('assert');
let User = require('./../../models/user');

describe('User Model', ()=> {
	let app;

	app = express();
	i18n.configure({
		directory: __dirname + '/../../config/locales',
		locales: ['en', 'es'],
		defaultLocale: 'en',
		register: global
	});

	app.use(i18n.init);

	before((done)=> {
		//TODO: Add other collection to avoid delete the real db
		app = app.listen(config.app.port, (error)=> {
			if (!error) {
				mongoose.connect(config.database.mongodb.host, (error)=> {
					if (!error) {
						done();
					}
				});
			}
		});
	});

	after((done) => {
		app.close((error) => {
			if (!error) {
				mongoose.connection.db.dropCollection('users', (error, result) => {
					if (!error) {
						mongoose.connection.close((error) => {
							if (!error)
								done();
						});
					}
				});
			}
		});
	});

	describe('Save users', ()=> {
		describe('Check Email', ()=> {
			it('Should save a valid user "' + JSON.stringify(mockUserModel.validUserEmail) + '"', function (done) {
				let user = new User(mockUserModel.validUserEmail);

				user.save((error) => {
					assert.equal(error, undefined);

					if (!error)
						done();
				});
			});

			it('Should not save a user without the email "' + JSON.stringify(mockUserModel.userWithoutEmail) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutEmail);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.email.message, 'Path `email` is required.');
					if (error)
						done();
				});
			});

			it('Should not save a user without a valid email "' + JSON.stringify(mockUserModel.userWrongEmail) + '"', function (done) {
				let user = new User(mockUserModel.userWrongEmail);

				user.save((error) => {
					assert.equal(error.errors.email.message, i18n.__('Email syntax is not correct'));
					if (error)
						done();
				});
			});
		});

		describe('Check username', ()=> {
			it('Should save a valid user with a correct username "' + JSON.stringify(mockUserModel.validUserUsername) + '"', function (done) {
				let user = new User(mockUserModel.validUserUsername);

				user.save((error) => {
					assert.equal(error, undefined);

					if (!error)
						done();
				});
			});

			it('Should not save a user with a repeted username "' + JSON.stringify(mockUserModel.reapetedUserUsername) + '"', function (done) {
				let user = new User(mockUserModel.reapetedUserUsername);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.message,  'E11000 duplicate key error index: test.users.$username_1 dup key: { : "' + mockUserModel.reapetedUserUsername.username + '" }');
					if (error)
						done();
				});
			});

			it('Should not Save a user without the username "' + JSON.stringify(mockUserModel.userWithoutUsername) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutUsername);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.username.message,  'Path `username` is required.');
					if (error)
						done();
				});
			});
		});

		describe('Check Mobile phone', ()=> {
			it('Should save a user with a correct mobile phone "' + JSON.stringify(mockUserModel.validUserPhone) + '"', function (done) {
				let user = new User(mockUserModel.validUserPhone);

				user.save((error) => {
					assert.equal(error, undefined);

					if (!error)
						done();
				});
			});

			it('Should not save a user without a mobile phone "' + JSON.stringify(mockUserModel.userWithoutPhone) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutPhone);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.mobilePhone.message,  'Path `mobilePhone` is required.');
					if (error)
						done();
				});
			});

			it('Should not save a user with letters on mobile phone "' + JSON.stringify(mockUserModel.userWithLettersOnMobile) + '"', function (done) {
				let user = new User(mockUserModel.userWithLettersOnMobile);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.mobilePhone.message,  'Cast to Number failed for value "' + mockUserModel.userWithLettersOnMobile.mobilePhone + '" at path "mobilePhone"');
					if (error)
						done();
				});
			});

			it('Should not save a user with a repeated mobile phone "' + JSON.stringify(mockUserModel.reapetedUserPhone) + '"', function (done) {
				let user = new User(mockUserModel.reapetedUserPhone);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.message,  'E11000 duplicate key error index: test.users.$mobilePhone_1 dup key: { : ' + mockUserModel.reapetedUserPhone.mobilePhone + ' }');
					if (error)
						done();
				});
			});
		});

		describe('Check Code country', ()=> {
			it('Should save a user with a normal code country "' + JSON.stringify(mockUserModel.validUserCodeCountry) + '"', function (done) {
				let user = new User(mockUserModel.validUserCodeCountry);

				user.save((error) => {
					assert.equal(error, undefined);
					if (!error)
						done();
				});
			});

			it('Should save a user with a dash code country "' + JSON.stringify(mockUserModel.validUserSecondCodeCountry) + '"', function (done) {
				let user = new User(mockUserModel.validUserSecondCodeCountry);

				user.save((error) => {
					assert.equal(error, undefined);
					if (!error)
						done();
				});
			});

			it('Should not save a user without a code country "' + JSON.stringify(mockUserModel.userWithoutCodeCountry) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutCodeCountry);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.codeCountry.message,  'Path `codeCountry` is required.');
					if (error)
						done();
				});
			});

			it('Should not save a user with a incorrect code country "' + JSON.stringify(mockUserModel.userWithoutCodeCountry) + '"', function (done) {
				let user = new User(mockUserModel.reapetedUserPhone);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.message,  'E11000 duplicate key error index: test.users.$mobilePhone_1 dup key: { : ' + mockUserModel.reapetedUserPhone.mobilePhone + ' }');
					if (error)
						done();
				});
			});
		});

		describe('Check Birthdate', ()=> {
			it('Should not save a user without a birthdate "' + JSON.stringify(mockUserModel.userWithoutBirthdate) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutBirthdate);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors['meta.birthdate'].message,  'Path `meta.birthdate` is required.');
					if (error)
						done();
				});
			});

			it('Should not save a user with a incorrect birthdate "' + JSON.stringify(mockUserModel.userWrongBirthdate) + '"', function (done) {
				let user = new User(mockUserModel.userWrongBirthdate);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors['meta.birthdate'].message,  'Cast to Date failed for value "' + mockUserModel.userWrongBirthdate.meta.birthdate + '" at path "meta.birthdate"');
					if (error)
						done();
				});
			});
		});

		describe('Check password', ()=> {
			it('Should not save a user without password "' + JSON.stringify(mockUserModel.userWithoutPassword) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutPassword);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.password.message,  'Path `password` is required.');
					if (error)
						done();
				});
			});
		});

		describe('Check Fullname', ()=> {
			it('Should not save a user without fullName "' + JSON.stringify(mockUserModel.userWithoutFullname) + '"', function (done) {
				let user = new User(mockUserModel.userWithoutFullname);

				user.save((error) => {
					//TODO: convert default mesagges to i18n
					assert.equal(error.errors.fullName.message,  'Path `fullName` is required.');
					if (error)
						done();
				});
			});
		});

		describe('Check created at', ()=> {
			it('Should save a valid user and check if created date exist "' + JSON.stringify(mockUserModel.validUserCreateAt) + '"', function (done) {
				let user = new User(mockUserModel.validUserCreateAt);

				user.save((error) => {
					assert.equal(error, undefined);
					assert(user.created_at);
					if (!error)
						done();
				});
			});
		});

		describe('Check Updated at', ()=> {
			it('Save a valid user and check if updated at is the same that created at "' + JSON.stringify(mockUserModel.validUserUpdateAt) + '"', function (done) {
				let user = new User(mockUserModel.validUserUpdateAt);

				user.save((error) => {
					assert.equal(error, undefined);
					assert(user.updated_at);
					if (!error)
						done();
				});
			});
		});
	});
});
