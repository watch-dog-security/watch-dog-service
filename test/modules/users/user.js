'use strict';

let assert = require('assert');
let UserManager = require('./../../../modules/users/user.js');
let User = require('./../../../models/user');
let sinon = require('sinon');
let chai = require('chai');
let server = require('./../../../server.js');
let expect = chai.expect;
let mock = require('./../../mocks/modules/users/user.js');

describe('User module', () => {
	describe('Check Function makeOptionsWithUserModel', () => {
		it('should return an object with username and password', (done) => {
			var madeOptions = UserManager.makeOptionsWithUserModel(mock.userOptions);

			assert.deepEqual(mock.optionsVerified, madeOptions);

			done();
		});

		it('should throw an Exception "' + __('User options is not correct') + '" when user.userName formation object is not correct', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsUserNameNotCorrect)
			}).to.throw(__('User options is not correct'));

			done();
		});

		it('should throw an Exception "' + __('User options is not correct') + '" when user.userName is undefined', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsUserNameUndefined)
			}).to.throw(__('User options is not correct'));

			done();
		});

		it('should throw an Exception "' + __('User options is not correct') + '" when user.password formation object is not correct', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsPasswordNotCorrect)
			}).to.throw(__('User options is not correct'));

			done();
		});

		it('should throw an Exception "' + __('User options is not correct') + '" when user.password is undefined', (done) => {
			expect(() => {
				UserManager.makeOptionsWithUserModel(mock.userOptionsPasswordUndefined)
			}).to.throw(__('User options is not correct'));

			done();
		});
	});

	describe('Check Function parseJsonToUserModel', () => {
		it('should return User object', (done) => {
			done();
		});

		it('should throw an Exception "' + __('Body to parse to JSON is undefined') + '"', (done) => {
			expect(() => {
				UserManager.parseJsonToUserModel({
					body: undefined
				});
			}).to.throw(__('Body to parse to JSON is undefined'));
			done();
		});

		it('should throw an Exception "' + __('User json formation is not correct') + '"', (done) => {
			expect(() => {
				UserManager.parseJsonToUserModel({
					body: mock.userJsonPasswordFormation
				});
			}).to.throw(__('User json formation is not correct'));
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

			assert.equal(JSON.stringify(userFromJson), JSON.stringify(mockedCorrectUser));

			done();
		});

		it('should thrown an Error when JSON is not correct', (done) => {
			expect(() => {
				UserManager.getUserFromJSON(mock.userJsonPasswordFormation)
			}).to.throw(__('User json formation is not correct'));

			done();
		});

		it('should thrown an Error when JSON value is undefined', (done) => {
			expect(() => {
				UserManager.getUserFromJSON(mock.userJsonBirthdateIsUndefined)
			}).to.throw(__('User json formation is not correct'));

			done();
		});
	});

	describe('Check Function parseUserToPayload', () => {
		it('should return an object with a full information', (done) => {
			done();
		});
	});

	describe('Check Function checkUserFromDB', () => {
		it('should return an object with a full information', (done) => {
			done();
		});
	});

	describe('Check Function getParsedBodyJSON', () => {
		it('should return an object when pass a correct JSON', (done) => {
			var parsedBodyFromJSON = UserManager.getParsedBodyJSON(mock.userJson);

			assert.equal(JSON.stringify(mock.userJson), JSON.stringify(parsedBodyFromJSON));

			done();
		});

		it('should throw an Error when body is undefined', (done) => {
			expect(() => {
				UserManager.getParsedBodyJSON(undefined);
			}).to.throw(__('Body to parse to JSON is undefined'));

			done();
		});
	});
});
