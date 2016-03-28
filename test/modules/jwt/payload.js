'use strict';

const i18n = require("i18n");
const express = require('express');
const config = require('./../../../config/server/config.js');
let assert = require('assert');
let payload = require('./../../../modules/jwt/payload');
let mock = require('./../../mocks/modules/jwt/payload');

describe('Payload module', ()=> {
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
			if (!error)
				done();
		});
	});

	after((done) => {
		app.close((error) => {
			if (!error)
				done();
		});
	});

	describe('check function createPayload', ()=> {
		it('Should create a payload object', (done) => {
			let createdPayload = payload.createPayload(mock.configuration._id, mock.configuration.username);

			assert(createdPayload);
			assert.equal(createdPayload.username, mock.configuration.username);
			assert.equal(createdPayload._id, mock.configuration._id);

			done();
		});
	});

	describe('check function checkUndefinedPayload', ()=> {
		it('Should return true when payload is correct', (done) => {
			let checkedPayload = payload.checkUndefinedPayload({
				_id: '1',
				username: 'UserNamePrueba',
				encripted_at: new Date()
			});
			assert.equal(checkedPayload, true);
			done();
		});

		it('Should return false when payload have undefined _id', (done) => {
			let checkedPayload = payload.checkUndefinedPayload(mock.payloadIdUndefined);
			assert.equal(checkedPayload, false);
			done();
		});

		it('Should return false when payload have undefined username', (done) => {
			let checkedPayload = payload.checkUndefinedPayload(mock.payloadUsernameUndefined);
			assert.equal(checkedPayload, false);
			done();
		});

		it('Should return false when payload have undefined encripted_at', (done) => {
			let checkedPayload = payload.checkUndefinedPayload(mock.payloadEncriptedUndefined);
			assert.equal(checkedPayload, false);
			done();
		});
	});

	describe('check function createPayloadVerifiedPromise', ()=> {
		it('Should promise resolve with payload', (done) => {
			payload.createPayloadVerifiedPromise(mock.configuration._id, mock.configuration.username)
				.then((payload) => {
					assert(payload);
					assert.equal(payload.username, mock.configuration.username);
					assert.equal(payload._id, mock.configuration._id);
					done();
				});
		});

		it('Should promise reject by undefined _id', (done) => {
			payload.createPayloadVerifiedPromise(undefined, mock.configuration.username)
				.catch((error) => {
					assert.deepEqual(error, new Error(__('Something is going wrong with the data of the payload')));
					done();
				});
		});

		it('Should promise reject by undefined username', (done) => {
			payload.createPayloadVerifiedPromise(undefined, mock.configuration.username)
				.catch((error) => {
					assert.deepEqual(error, new Error(__('Something is going wrong with the data of the payload')));
					done();
				});
		});
	});
});
