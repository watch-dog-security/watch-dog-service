'use strict';

let express = require('express');
let request = require('supertest');

let expect = require('chai').expect;
let emptyBody = require('./../../../middlewares/helper/emptyBody');
let errorHandler = require('./../../../middlewares/error/handler');
let appError = require('./../../../modules/error/manager');
let app;

let mongoose = require('mongoose');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const mock = require('./../../mocks/middlewares/helper/emptyBody');
const config = require('./../../../config/server/config');

describe('Middleware: empty body', () => {

	before((done) => {
		i18n.configure({
			directory: __dirname + '/../../../config/locales',
			locales: ['en', 'es'],
			defaultLocale: 'en',
			register: global
		});

		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.set('i18n', i18n);
		app.set('appError', appError);
		app.use(emptyBody);
		app.use(errorHandler);
		done();
	});

	after((done) => {
		done();
	});

	it('Should send code "' + appError('NO_DATA').code + '" with message "' + appError('NO_DATA').message + '" when body data is "undefined"', (done) => {
		console.log(appError('NO_DATA').code);
		request(app)
			.post('/')
			.send('')
			.expect(appError('NO_DATA').code)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('NO_DATA').message);
				done();
			});
	});

	it('Should send code "' + appError('NO_DATA').code + '" with message "' + appError('NO_DATA').message + '" when body data is "null"', (done) => {
		request(app)
			.post('/')
			.send(mock.nullVariable)
			.expect(appError('NO_DATA').code)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('NO_DATA').message);
				done();
			});
	});

	it('Should send code "' + appError('NO_DATA').code + '" with message "' + appError('NO_DATA').message + '" when body data is "{}"', (done) => {
		request(app)
			.post('/')
			.send(mock.emptyObject)
			.expect(appError('NO_DATA').code)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('NO_DATA').message);
				done();
			});
	});

	it('Should send code "' + appError('NO_DATA').code + '" with message "' + appError('NO_DATA').message + '" when body data is ""', (done) => {
		request(app)
			.post('/')
			.send(mock.emptyString)
			.expect(appError('NO_DATA').code)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('NO_DATA').message);
				done();
			});
	});

	it('Should send code "200" when', (done) => {
		request(app)
			.post('/')
			.send(mock.body)
			.expect(404,done)
	});

});
