'use strict';

let assert = require('assert');
let AppError = require('./../../../modules/error/manager');
let jwt = require('./../../../modules/jwt/jwt');
let payload = require('./../../../modules/jwt/payload');

const config = require('./../../../config/server/config');
const mock = require('./../../mocks/modules/jwt/jwt');

describe('JWT module', ()=> {
	describe('Check function Encrypt', ()=> {
		let userPayload;

		before((done) => {
			userPayload = payload.createPayload(
				mock.configurationOfThePayload._id,
				mock.configurationOfThePayload.username
			);
			done();
		});

		it('Token should be generated', (done) => {
			let token = jwt.encrypt(userPayload);
			assert(token);
			done();
		});

		it('Should throw error "' + AppError('KEY_NOT_SUPPLIED').message + '" when key is not supplied ' , (done) => {
			//TODO
			done();
		});

		it('Should token throw error "' + AppError('ALGORITHM_NOT_SUPPORTED').message + '"' , (done) => {
			//TODO
			done();
		});
	});

	describe('Check function Decrypt', ()=> {

		let token;

		before((done) => {
			let userPayload = payload.createPayload(
				mock.configurationOfThePayload._id,
				mock.configurationOfThePayload.username
			);
			token = jwt.encrypt(userPayload);
			done();
		});

		it('Should token be valid', (done) => {
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
			//TODO 
			done();
		});

		it('Should token throw error "' + AppError('EXPIRED_TOKEN').message + '"' , (done) => {
			//TODO
			done();
		});

		it('Should token throw error "' + AppError('TOKEN_NOT_ACTIVE').message + '"' , (done) => {
			//TODO
			done();
		});

		it('Should token throw error "' + AppError('ALGORITHM_NOT_SUPPORTED').message + '"' , (done) => {
			//TODO
			done();
		});

		it('Should token throw error "' + AppError('TOKEN_NOT_SUPPLIED').message + '"' , (done) => {
			//TODO
			done();
		});
	});
});
