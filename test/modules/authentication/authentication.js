'use strict';

let assert = require('assert');
let authentication = require('./../../../modules/authentication/authentication.js');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;

describe('Authentication module', () => {
	describe('Check Function check authentication', () => {
		it('should return true if the authorizationHeader have something',(done) => {
			var authorizationHeader = 'test';
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, true);
			done();
		});

		it('should return false if the authorizationHeader is undefined',(done) => {
			var authorizationHeader = undefined;
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, false);
			done();
		});

		it('should return false if the authorizationHeader is a void string',(done) => {
			var authorizationHeader = '';
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, false);
			done();
		});
	});

	describe('Check Function decode', () => {
		it('should decode authentication header on base64 on the correct way',(done) => {
			var authorizationHeader = '';
			var authorizationHeaderOnBase64 = '';
			var authenticationDecodeResult = authentication.decode(authorizationHeader);
			//assert.equal(authenticationDecodeResult, authorizationHeaderOnBase64);
			done();
		});

		it('should throw exception when authentication header have more than 2 parts',(done) => {
			done();
		});

		it('should throw exception when authentication header have less that 2 parts',(done) => {
			done();
		});
	});

	describe('Check Function getUserAuthentication', () => {
		it('should decode authentication header and call to parseAuthRequestToUserModel function',(done) => {
			done();
		});
	});

	describe('Check Function parseAuthRequestToUserModel', () => {
		it('should return a athentication Object',(done) => {
			done();
		});
	});
});
