'use strict';

const i18n = require('i18n');
const express = require('express');
const config = require('./../../../config/server/config.js');
const mongoose = require('mongoose');

let assert = require('assert');
let UserManager = require('./../../../modules/users/user');
let User = require('./../../../models/user');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;
let mock = require('./../../mocks/modules/users/user.js');
let mockPayload = require('./../../mocks/modules/jwt/payload');
let appError = require('./../../../modules/error/manager');

describe('User module', () => {
	let app;

	app = express();
	i18n.configure({
		directory: __dirname + '/../../../config/locales',
		locales:['en', 'es'],
		defaultLocale: 'en',
		register: global
	});

	app.use(i18n.init);

	before((done)=> {
		app = app.listen(config.app.port, (error)=> {
			if (!error){
				done();
			}
		});
	});

	after((done) => {
		app.close((error) => {
			if (!error){
				done();
			}
		});
	});

	describe('Check Function makeOptionsWithUserModel', () => {
		it('should return an object with username and password', (done) => {
			var madeOptions = UserManager.makeOptionsWithUserModel(mock.userOptions);

			assert.deepEqual(mock.optionsVerified, madeOptions);

			done();
		});

		it('should throw an error "' + appError('USER_OPTIONS').message + '" when user.userName formation object is not correct', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsUserNameNotCorrect);
			}).to.throw(appError('USER_OPTIONS').message);

			done();
		});

		it('should throw an error "' + appError('USER_OPTIONS').message + '" when user.userName is undefined', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsUserNameUndefined);
			}).to.throw(appError('USER_OPTIONS').message);

			done();
		});

		it('should throw an error "' + appError('USER_OPTIONS').message + '" when user.password formation object is not correct', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsPasswordNotCorrect);
			}).to.throw(appError('USER_OPTIONS').message);

			done();
		});

		it('should throw an error "' + appError('USER_OPTIONS').message + '" when user.password is undefined', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsPasswordUndefined);
			}).to.throw(appError('USER_OPTIONS').message);

			done();
		});
	});

	describe('Check Function parseJsonToUserModel', () => {
		it('should return User object', (done) => {
			let userFromManager = UserManager.parseJsonToUserModel(mock.userJson);

			//todo: improve asserts
			assert(userFromManager);
			done();
		});

		it('should throw an error "' + appError('BODY_UNDEFINED').message + '" when json is undefined', (done) => {
			expect(() => {
				UserManager.parseJsonToUserModel(undefined);
			}).to.throw(appError('BODY_UNDEFINED').message);
			done();
		});

		it('should throw an error "' + appError('JSON_FORMATION').message + '" when json is not correct', (done) => {
			expect(() => {
				UserManager.parseJsonToUserModel({
					body: mock.userJsonPasswordFormation
				});
			}).to.throw(appError('JSON_FORMATION').message);
			done();
		});
	});

	describe('Check Function checkUserFromJSON', () => {
		it('should return true when info is correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJson);
			assert.equal(booleanCheck, true);
			done();
		});

		it('should return false when fullname name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonFullNameFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when fullname is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonFullNameIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when password name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonPasswordFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when password is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonPasswordIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when username name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonUserNameFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when username is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonUserNameIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when email name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonEmailFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when email is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonEmailIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when codecountry name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonCodeCountryFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when codecountry is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonCodeCountryIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when birthdate name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonBirthdateFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when birthdate is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonBirthdateIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when mobilephone name formation is not correct', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonMobilePhoneFormation);
			assert.equal(booleanCheck, false);
			done();
		});

		it('should return false when mobilephone is undefined', (done) => {
			var booleanCheck = UserManager.checkUserFromJSON(mock.userJsonMobilePhoneIsUndefined);
			assert.equal(booleanCheck, false);
			done();
		});
	});

	describe('Check Function makeUserFromJSON', () => {
		it('should return an object with a user Object', (done) => {
			var madeUser = UserManager.makeUserFromJSON(mock.userJson);
			assert.deepEqual(mock.correctUser, madeUser);
			done();
		});
	});

	describe('Check Function getUserFromJSON', () => {
		it('should return a correct User object from JSON object', (done) => {
			var userFromJson = UserManager.getUserFromJSON(mock.userJson);
			var mockedCorrectUser = new User(mock.correctUser);
			mockedCorrectUser._doc._id = userFromJson._doc._id;

			assert(mockedCorrectUser.created_at);
			assert(userFromJson.created_at);

			mockedCorrectUser.created_at = '';
			userFromJson.created_at = '';

			assert.equal(JSON.stringify(userFromJson), JSON.stringify(mockedCorrectUser));

			done();
		});

		it('should thrown an error "' + appError('JSON_FORMATION').message + '" when JSON is not correct', (done) => {
			expect(() => {
				UserManager.getUserFromJSON(mock.userJsonPasswordFormation)
			}).to.throw(appError('JSON_FORMATION').message);

			done();
		});

		it('should thrown an error "' + appError('JSON_FORMATION').message + '" when JSON value is undefined', (done) => {
			expect(() => {
				UserManager.getUserFromJSON(mock.userJsonBirthdateIsUndefined)
			}).to.throw(appError('JSON_FORMATION').message);

			done();
		});
	});

	describe('Check Function parseUserToPayload', () => {
		it('should return the correct payload', (done) => {
			let payload = UserManager.parseUserToPayload(mockPayload.configuration);
			assert.equal(payload._id, mockPayload.configuration._id);
			assert.equal(payload.username, mockPayload.configuration.username);
			assert(payload.exp);
			done();
		});

		it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" with a undefined _id', (done) => {
			try{
				UserManager.parseUserToPayload(mockPayload.configurationUndefinedId);
			}catch(exception){
				assert.equal(exception.message, appError('WRONG_USER_FROM_REQUEST').message);
				done();
			}
		});

		it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" with a undefined username', (done) => {
			try{
				UserManager.parseUserToPayload(mockPayload.configurationUndefinedUsername);
			}catch(exception){
				assert.equal(exception.message, appError('WRONG_USER_FROM_REQUEST').message);
				done();
			}
		});
	});

	describe('Check Function checkUserFromDB', () => {
		let userFromManager;

		before((done)=> {
			mongoose.connect(config.database.mongodb.host, (error)=> {
				if (!error) {
					userFromManager = UserManager.parseJsonToUserModel(mock.userJson);

					userFromManager.save((err)=> {
						if (!err) {
							done();
						}
					});
				}
			});
		});

		after((done)=> {
			User.findOneAndRemove({"username": "albertoig", "password": "1234"}, () => {
				mongoose.connection.close((error) => {
					if (!error)
						done();
				});
			});
		});

		it('should resolve when APP find a User', (done) => {
			UserManager.checkUserFromDB(mock.userOptionsJson).then((user) => {
				assert(user._id);
				assert.equal(user.password, mock.userOptionsJson.password);
				done();
			});
		});

		it('should resolve with no user when APP does not find a User', (done) => {
			UserManager.checkUserFromDB(mock.userOptionsNoExist).then((user) => {
				assert.deepEqual(user, null);
				done();
			});
		});

		it('should reject when error on find mongoose', (done) => {
			sinon.stub(User, "findOne", (options, cb) => {
				cb('Error', null);
			});

			UserManager.checkUserFromDB(mock.userOptionsNoExist).catch((error) => {
				assert.equal(error, 'Error');
				done();
			});
		});

		it('should throw an Exception "' + appError('USER_OPTIONS').message + '" when username is not correct', (done) => {
			UserManager.checkUserFromDB(mock.userOptionsUserNameNotCorrect).catch((error) => {
				assert.equal(error.message, appError('USER_OPTIONS').message);
				done();
			});
		});

		it('should throw an Exception "' + appError('USER_OPTIONS').message + '" when password is undefined', (done) => {
			UserManager.checkUserFromDB(mock.userOptionsPasswordUndefined).catch((error) => {
				assert.equal(error.message, appError('USER_OPTIONS').message);
				done();
			});
		});
	});

	describe('Check Function getParsedBodyJSON', () => {
		it('should return an object when pass a correct JSON', (done) => {
			var parsedBodyFromJSON = UserManager.getParsedBodyJSON(mock.userJson);

			assert.equal(JSON.stringify(mock.userJson), JSON.stringify(parsedBodyFromJSON));

			done();
		});

		it('should throw an error "' + appError('BODY_UNDEFINED').message + '" when body is undefined', (done) => {
			expect(() => {
				UserManager.getParsedBodyJSON(undefined);
			}).to.throw(appError('BODY_UNDEFINED').message);

			done();
		});
	});

	describe('Check Function checkUserFromRequest', () => {
		it('should return true when user from request is correct', (done) => {
			var checkedUserFromRequest = UserManager.checkUserFromRequest(mockPayload.correctUserFromRequest);
			assert.equal(checkedUserFromRequest, true);
			done();
		});

		it('should return false when user from request is undefined', (done) => {
			var checkedUserFromRequest = UserManager.checkUserFromRequest(mockPayload.userFromRequestUndefined);
			assert.equal(checkedUserFromRequest, false);
			done();
		});

		it('should return false when user._id is undefined', (done) => {
			var checkedUserFromRequest = UserManager.checkUserFromRequest(mockPayload.userFromRequestWithUndefinedId);
			assert.equal(checkedUserFromRequest, false);
			done();
		});

		it('should return false when user.username is undefined', (done) => {
			var checkedUserFromRequest = UserManager.checkUserFromRequest(mockPayload.userFromRequestWithUndefinedUsername);
			assert.equal(checkedUserFromRequest, false);
			done();
		});
	});


	describe('Check Function checkUserFromOptions', () => {
		it('should return true when user from options is correct', (done) => {
			var checkedUserFromOptions = UserManager.checkUserFromOptions(mock.userOptions);
			assert.equal(checkedUserFromOptions, true);
			done();
		});

		it('should return false when user from options is undefined', (done) => {
			var checkedUserFromOptions = UserManager.checkUserFromOptions(mock.userOptionsUndefined);
			assert.equal(checkedUserFromOptions, false);
			done();
		});

		it('should return false when user.password is undefined', (done) => {
			var checkedUserFromOptions = UserManager.checkUserFromOptions(mock.userOptionsUserNameUndefined);
			assert.equal(checkedUserFromOptions, false);
			done();
		});

		it('should return false when user.username is undefined', (done) => {
			var checkedUserFromOptions = UserManager.checkUserFromOptions(mock.userOptionsUserNameUndefined);
			assert.equal(checkedUserFromOptions, false);
			done();
		});
	});
});
