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

	describe('check function fillPayload', ()=> {
		it('Should create a payload object', (done) => {
			let createdPayload = payload.fillPayload(mock.configuration._id, mock.configuration.username);

			assert(createdPayload);
			assert.equal(createdPayload.username, mock.configuration.username);
			assert.equal(createdPayload._id, mock.configuration._id);

			done();
		});
	});

	describe('check function checkPayload', ()=> {
		it('Should return true when payload is correct', (done) => {
			let checkedPayload = payload.checkPayload({
				_id: '1',
				username: 'UserNamePrueba',
				exp: new Date()
			});
			assert.equal(checkedPayload, true);
			done();
		});

		it('Should return false when payload have undefined _id', (done) => {
			let checkedPayload = payload.checkPayload(mock.payloadIdUndefined);
			assert.equal(checkedPayload, false);
			done();
		});

		it('Should return false when payload have undefined username', (done) => {
			let checkedPayload = payload.checkPayload(mock.payloadUsernameUndefined);
			assert.equal(checkedPayload, false);
			done();
		});

		it('Should return false when payload have undefined encripted_at', (done) => {
			let checkedPayload = payload.checkPayload(mock.payloadEncriptedUndefined);
			assert.equal(checkedPayload, false);
			done();
		});
	});

	describe('check function createPayload', ()=> {
		it('Should return a correct payload', (done) => {
			let oPayload = payload.createPayload(mock.configuration._id, mock.configuration.username);
			assert(oPayload);
			assert.equal(oPayload.username, mock.configuration.username);
			assert.equal(oPayload._id, mock.configuration._id);
			done();
		});

		it('Should return an error "' + __('Something is going wrong with the data of the payload') + '" when _id is undefined', (done) => {
			try {
				payload.createPayload(undefined, mock.configuration.username);
			} catch(exception){
				assert.equal(exception.message, __('Something is going wrong with the data of the payload'));
				done();
			}
		});

		it('Should return an error "' + __('Something is going wrong with the data of the payload') + '" when username is undefined', (done) => {
			try {
				payload.createPayload( mock.configuration._id ,undefined);
			} catch(exception){
				assert.equal(exception.message, __('Something is going wrong with the data of the payload'));
				done();
			}
		});
	});
});
