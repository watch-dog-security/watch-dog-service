'use strict';

let assert = require('assert');
let authentication = require('./../../../modules/authentication/authentication.js');
let sinon = require('sinon');
let chai = require('chai');
let server = require('./../../../server.js');
let expect = chai.expect;

describe('Authentication module', () => {
	describe('Check Function check authentication', () => {
		it('should return true if the authorizationHeader have something', (done) => {
			var authorizationHeader = 'test';
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, true);
			done();
		});

		it('should return false if the authorizationHeader is undefined', (done) => {
			var authorizationHeader = undefined;
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, false);
			done();
		});

		it('should return false if the authorizationHeader is a void string', (done) => {
			var authorizationHeader = '';
			var authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, false);
			done();
		});
	});

	describe('Check Function decode', () => {
		it('should decode authentication header on base64 on the correct way', (done) => {
			var authorizationHeader = 'Basic cHJ1ZWJhOnBydWViYQ==';
			var authorizationHeaderDecodedOnBase64 = 'prueba:prueba';
			var authenticationDecodeResult = authentication.decode(authorizationHeader);

			assert.equal(authenticationDecodeResult, authorizationHeaderDecodedOnBase64);
			done();
		});

		it('should throw exception when authentication header have more than 2 parts', (done) => {
			var authorizationHeader = 'Basic cHJ1ZWJh OnBydWViYQ==';

			expect(() => {
				authentication.decode(authorizationHeader)
			}).to.throw(__('Authorization header is not correct'));

			done();
		});

		it('should throw exception when authentication header have less that 2 parts', (done) => {
			var authorizationHeader = 'BasiccHJ1ZWJhOnBydWViYQ==';

			expect(() => {
				authentication.decode(authorizationHeader)
			}).to.throw(__('Authorization header is not correct'));

			done();
		});

		it('should throw exception when authentication header is undefined', (done) => {
			var authorizationHeader = undefined;

			expect(() => {
				authentication.decode(authorizationHeader)
			}).to.throw(__('Authorization header is not correct'));

			done();
		});
	});

	describe('Check Function getUserAuthentication', () => {
		it('should decode authentication header and call to parseAuthRequestToUserModel function', (done) => {
			var authorizationHeader = 'Basic cHJ1ZWJhOnBydWViYQ==';
			var parsedAuthenticationRequest = {
				username: 'prueba',
				password: 'prueba'
			};
			var result = authentication.getUserAuthentication(authorizationHeader);

			assert.deepEqual(result, parsedAuthenticationRequest);
			done();
		});

		it('should throw exception when header is undefined', (done) => {
			var authorizationHeader = undefined;

			expect(() => {
				authentication.getUserAuthentication(authorizationHeader)
			}).to.throw(__('Authorization header is not correct'));

			done();
		});
	});

	describe('Check Function parseAuthRequestToUserModel', () => {
		it('should return an athentication parsed Object', (done) => {
			var authorizationHeaderDecodedOnBase64 = 'prueba:prueba';
			var parsedAuthenticationRequest = {
				username: 'prueba',
				password: 'prueba'
			};

			var parsedResult = authentication.parseAuthRequestToUserModel(authorizationHeaderDecodedOnBase64);
			assert.deepEqual(parsedResult, parsedAuthenticationRequest);
			done();
		});

		it('should throw an Error when authoritation header is undefined', (done) => {
			var authorizationHeaderDecodedOnBase64 = undefined;

			expect(() => {
				authentication.parseAuthRequestToUserModel(authorizationHeaderDecodedOnBase64)
			}).to.throw(__('Authorization header is not correct'));

			done();
		});
	});

	describe('Check Function getAuthenticationException', () => {
		it('should return an Error exception', (done) => {
			expect(() => {
				throw authentication.getAuthenticationException()
			}).to.throw(__('Authorization header is not correct'));

			done();
		});
	});
});
