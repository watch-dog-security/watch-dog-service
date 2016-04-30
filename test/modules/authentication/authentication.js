'use strict';

const i18n = require('i18n');
const express = require('express');
const config = require('./../../../config/server/config.js');

let assert = require('assert');
let chai = require('chai');
let expect = chai.expect;
let appError = require('./../../../modules/error/manager');
let authentication = require('./../../../modules/authentication/authentication.js');

describe('Authentication module', () => {
	let app;

	app = express();
	i18n.configure({
		directory: __dirname + '/../../../config/locales',
		locales:['en', 'es'],
		defaultLocale: 'en',
		register: global
	});

	app.use(i18n.init);

	before((done) => {
		app = app.listen(config.app.port, (error) => {
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

	describe('Check Function check authentication', () => {
		it('should return true if the authorizationHeader have something', (done) => {
			let authorizationHeader = 'test';
			let authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, true);
			done();
		});

		it('should return false if the authorizationHeader is undefined', (done) => {
			let authenticationResult = authentication.check();
			assert.equal(authenticationResult, false);
			done();
		});

		it('should return false if the authorizationHeader is a void string', (done) => {
			let authorizationHeader = '';
			let authenticationResult = authentication.check(authorizationHeader);
			assert.equal(authenticationResult, false);
			done();
		});
	});

	describe('Check Function decode', () => {
		it('should decode authentication header on base64 on the correct way', (done) => {
			let authorizationHeader = 'Basic cHJ1ZWJhOnBydWViYQ==';
			let authorizationHeaderDecodedOnBase64 = 'prueba:prueba';
			let authenticationDecodeResult = authentication.decode(authorizationHeader);

			assert.equal(authenticationDecodeResult, authorizationHeaderDecodedOnBase64);
			done();
		});

		it('should throw an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authentication header have more than 2 parts', (done) => {
			let authorizationHeader = 'Basic cHJ1ZWJh OnBydWViYQ==';

			expect(() => {
				authentication.decode(authorizationHeader);
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);

			done();
		});

		it('should throw an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authentication header have less that 2 parts', (done) => {
			let authorizationHeader = 'BasiccHJ1ZWJhOnBydWViYQ==';

			expect(() => {
				authentication.decode(authorizationHeader);
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);

			done();
		});

		it('should throw an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authentication header is undefined', (done) => {
			expect(() => {
				authentication.decode();
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);

			done();
		});
	});

	describe('Check Function getUserAuthentication', () => {
		it('should decode authentication header and call to parseAuthRequestToUserModel function', (done) => {
			let authorizationHeader = 'Basic cHJ1ZWJhOnBydWViYQ==';
			let parsedAuthenticationRequest = {
				username: 'prueba',
				password: 'prueba'
			};
			let result = authentication.getUserAuthentication(authorizationHeader);

			assert.deepEqual(result, parsedAuthenticationRequest);
			done();
		});

		it('should throw an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when header is undefined', (done) => {
			expect(() => {
				authentication.getUserAuthentication();
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);

			done();
		});
	});

	describe('Check Function parseAuthRequestToUserModel', () => {
		it('should return an athentication parsed Object', (done) => {
			let authorizationHeaderDecodedOnBase64 = 'prueba:prueba';
			let parsedAuthenticationRequest = {
				username: 'prueba',
				password: 'prueba'
			};

			let parsedResult = authentication.parseAuthRequestToUserModel(authorizationHeaderDecodedOnBase64);
			assert.deepEqual(parsedResult, parsedAuthenticationRequest);
			done();
		});

		it('should throw an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authoritation header is undefined', (done) => {
			expect(() => {
				authentication.parseAuthRequestToUserModel();
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);

			done();
		});
	});

	describe('Check Function getAuthenticationException', () => {
		it('should return an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" exception', (done) => {
			expect(() => {
				throw authentication.getAuthenticationException();
			}).to.throw(appError('AUTH_HEADER_NOT_CORRECT').message);
			done();
		});
	});
});
