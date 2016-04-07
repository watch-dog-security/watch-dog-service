'use strict';

const i18n = require("i18n");
let assert = require('assert');
let AppError = require('./../../../modules/error/manager.js');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;
let mock = require('./../../mocks/modules/error/manager.js');

describe('Error manager module', () => {
	describe('Check Object AppError', () => {
		it('should return an error object', (done) => {
			let bodyError = AppError('BODY_UNDEFINED');

			expect(() => {
				throw bodyError;
			}).to.throw(i18n.__('Body to parse to JSON is undefined'));
			done();
		});

		it('should return a default error object', (done) => {
			let defaultError = AppError('DEFAULT');

			expect(() => {
				throw defaultError;
			}).to.throw(i18n.__('Unexpected error, please contact with admin service'));
			done();
		});

		it('should return a string with toString function', (done) => {
			let bodyError = AppError('DEFAULT');
//TODO: do mock to this
			assert.equal(bodyError.toString(), )
			done();
		});
	});

	describe('Check function getErrorByTag', () => {
		it('should return an error by tag', (done) => {

			done();
		});

		it('should return a default error when tag not exist', (done) => {

			done();
		});

		it('should return a default error if not exist on JSON when tag not exist', (done) => {

			done();
		});
	});
});
