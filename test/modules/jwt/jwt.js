'use strict';

let assert = require('assert');
let AppError = require('./../../../modules/error/manager');
let jwt = require('./../../../modules/jwt/jwt');
let payload = require('./../../../modules/jwt/payload');
let mockery = require('mockery');
let chai = require('chai');
let expect = chai.expect;

const config = require('./../../../config/server/config');
const mock = require('./../../mocks/modules/jwt/jwt');

describe('JWT module', ()=> {
	describe('Check function Encrypt', ()=> {
		let userPayload;

		beforeEach((done) => {
			userPayload = payload.createPayload(
				mock.configurationOfThePayload._id,
				mock.configurationOfThePayload.username
			);

			mockery.enable({
				useCleanCache: true,
				warnOnReplace: false,
				warnOnUnregistered: false
			});

			done();
		});

		afterEach((done) => {
			mockery.deregisterAll();
			mockery.disable();
			jwt = require('./../../../modules/jwt/jwt');
			done();
		});

		it('Should generate the correct token', (done) => {
			let token = jwt.encrypt(userPayload);
			assert(token);
			done();
		});

		it('Should throw an error "' + AppError('KEY_NOT_SUPPLIED').message + '" when key is not supplied ' , (done) => {
			mockery.registerMock('./../../config/server/config.js', mock.configurationWithoutKey);
			jwt = require('./../../../modules/jwt/jwt');

			expect(() => {
				jwt.encrypt(userPayload);
			}).to.throw(AppError('KEY_NOT_SUPPLIED').message);
			done();
		});

		it('Should throw an error "' + AppError('ALGORITHM_NOT_SUPPORTED').message + '" when algorithm is not correct' , (done) => {
			mockery.registerMock('./../../config/server/config.js', mock.configurationWithoutAlgorithm);
			jwt = require('./../../../modules/jwt/jwt');

			expect(() => {
				jwt.encrypt(userPayload);
			}).to.throw(AppError('ALGORITHM_NOT_SUPPORTED').message);
			done();
		});

		it('Should throw an error "' + AppError('ENTRY_PAYLOAD').message + '" when payload is entry' , (done) => {
			expect(() => {
				jwt.encrypt('');
			}).to.throw(AppError('ENTRY_PAYLOAD').message);
			done();
		});
	});

	describe('Check function Decrypt', ()=> {

		beforeEach((done) => {
			mockery.enable({
				useCleanCache: true,
				warnOnReplace: false,
				warnOnUnregistered: false
			});
			done();
		});

		afterEach((done) => {
			mockery.deregisterAll();
			mockery.disable();
			jwt = require('./../../../modules/jwt/jwt');
			done();
		});

		it('Should token be valid', (done) => {
			let userPayload = payload.createPayload(
				mock.configurationOfThePayload._id,
				mock.configurationOfThePayload.username
			);
			let token = jwt.encrypt(userPayload);
			let decodeToken = jwt.decode(token);
			let username = decodeToken.username;
			let _id = decodeToken._id;
			let encripted_at = decodeToken.encripted_at;

			assert(username);
			assert(encripted_at);
			assert(_id);

			assert.equal(username, mock.configurationOfThePayload.username);
			assert.equal(_id, mock.configurationOfThePayload._id);

			done();
		});
		
		it('Should token throw error "' + AppError('SIGNATURE_VERIFICATION').message + '"' , (done) => {
			expect(() => {
				jwt.decode(mock.tokenSignedWithOtherPassword);
			}).to.throw(AppError('SIGNATURE_VERIFICATION').message);
			done();
		});

		it('Should token throw error "' + AppError('EXPIRED_TOKEN').message + '"' , (done) => {
			//TODO
			//expect(() => {
				//jwt.decode(mock.tokenSignedWithOtherPassword);
			//}).to.throw(AppError('EXPIRED_TOKEN').message);
			done();
		});

		it('Should token throw error "' + AppError('TOKEN_NOT_ACTIVE').message + '"' , (done) => {
			//TODO
			//expect(() => {
				//jwt.decode(mock.tokenSignedWithOtherPassword);
			//}).to.throw(AppError('TOKEN_NOT_ACTIVE').message);
			done();
		});

		it('Should token throw error "' + AppError('ALGORITHM_NOT_SUPPORTED').message + '"' , (done) => {
			mockery.registerMock('./../../config/server/config.js', mock.configurationWithoutAlgorithm);
			jwt = require('./../../../modules/jwt/jwt');

			expect(() => {
				jwt.decode(mock.tokenSignedWithOtherPassword);
			}).to.throw(AppError('ALGORITHM_NOT_SUPPORTED').message);
			done();
		});

		it('Should token throw error "' + AppError('TOKEN_NOT_SUPPLIED').message + '"' , (done) => {
			expect(() => {
				jwt.decode('');
			}).to.throw(AppError('TOKEN_NOT_SUPPLIED').message);
			done();
		});
	});
});
