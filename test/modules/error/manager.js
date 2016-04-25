'use strict';

let assert = require('assert');
let AppError = require('./../../../modules/error/manager.js');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;
let mockery = require('mockery');

const i18n = require('i18n');

describe('Error manager module', () => {

	i18n.configure({
		directory: __dirname + '/../../../config/locales',
		locales: ['en', 'es'],
		defaultLocale: 'en',
		register: global
	});

	before((done) => {
		done();
	});

	after((done) => {
		mockery.disable();
		done();
	});

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
			expect(bodyError.toString()).to.be.a('string');
			done();
		});

		it('should return a default error if TAG does not exist on JSON', (done) => {
			let defaultError = AppError('DEFAULT2');

			expect(() => {
				throw defaultError;
			}).to.throw(i18n.__('Unexpected error, please contact with admin service'));
			done();
		});

		it('should return a default error if default TAG does not exist on JSON', (done) => {

			mockery.enable({
				useCleanCache: true,
				warnOnReplace: false,
				warnOnUnregistered: false
			});

			mockery.registerMock('./../../config/errors/errors.json', './../../mocks/modules/errors/fake.json');

			let defaultError = require('./../../../modules/error/manager.js')('DEFAULT2');
			expect(() => {
				throw defaultError;
			}).to.throw(i18n.__('Unexpected error, please contact with admin service'));
			done();
		});
	});
});
