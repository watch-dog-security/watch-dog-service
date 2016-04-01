'use strict';

let assert = require('assert');
const mockValidatorUserModel = require('./../../mocks/models/validators/user.js');
const validator = require('./../../../models/validators/user.js');

describe('User validator', ()=> {
	describe('Function validateEmail ', ()=> {
		it('should return true when email "' + mockValidatorUserModel.validEmail + '" is correct', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.validEmail);
			assert.equal(validatedEmail, true);
			done();
		});

		it('should return false when email "' + mockValidatorUserModel.emailWithoutAt + '" does not have @', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.emailWithoutAt);
			assert.equal(validatedEmail, false);
			done();
		});

		it('should return false when email "' + mockValidatorUserModel.emailWithoutDomain + '" does not have domain', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.emailWithoutDomain);
			assert.equal(validatedEmail, false);
			done();
		});

		it('should return false when email "' + mockValidatorUserModel.emailWithoutName + '" does not have name before @', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.emailWithoutName);
			assert.equal(validatedEmail, false);
			done();
		});

		it('should return false when email "' + mockValidatorUserModel.emailWithoutCompleteDomain + '" does not have domain after @', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.emailWithoutCompleteDomain);
			assert.equal(validatedEmail, false);
			done();
		});

		it('should return false when email is undefined', (done) => {
			let validatedEmail = validator.validateEmail(mockValidatorUserModel.emailUndefined);
			assert.equal(validatedEmail, false);
			done();
		});
	});

	describe('Function validateCountryCode ', ()=> {
		it('should return true when country code "' + mockValidatorUserModel.validCountryCode + '" is correct', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.validCountryCode);
			assert.equal(validatedCountryCode, true);
			done();
		});

		it('should return true when country code "' + mockValidatorUserModel.validCountryCodeTwo + '" is correct', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.validCountryCodeTwo);
			assert.equal(validatedCountryCode, true);
			done();
		});

		it('should return false when country code "' + mockValidatorUserModel.countryCodeWithoutPlus + '" does not have + before', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.countryCodeWithoutPlus);
			assert.equal(validatedCountryCode, false);
			done();
		});

		it('should return false when country code "' + mockValidatorUserModel.countryCodeWithoutNumbers + '" does not have numbers', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.countryCodeWithoutNumbers);
			assert.equal(validatedCountryCode, false);
			done();
		});

		it('should return false when country code is undefined', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.countryCodeUndefined);
			assert.equal(validatedCountryCode, false);
			done();
		});

		it('should return false when country code "' + mockValidatorUserModel.countryCodeWithLetters + '" have letters', (done) => {
			let validatedCountryCode = validator.validateCountryCode(mockValidatorUserModel.countryCodeWithLetters);
			assert.equal(validatedCountryCode, false);
			done();
		});
	});
});
