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
			it('Should not save a user without a mobile phone', function (done) {
				//TODO:
				done();
			});

			it('Should not save a user with letters on mobile phone', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check Code country', ()=> {
			it('Should not save a user without a code country', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check Birthdate', ()=> {
			it('Should not save a user without a birthdate', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check password', ()=> {
			it('Should not save a user without a password', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check Fullname', ()=> {
			it('Should not save a user without fullname', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check created at', ()=> {
			it('Should save a valid user and check if created date exist', function (done) {
				//TODO:
				done();
			});
		});

		describe('Check Updated at', ()=> {
			it('Save a valid user and check if updated at is the same that created at', function (done) {
				//TODO:
				done();
			});
		});
	});
});
