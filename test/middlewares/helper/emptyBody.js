'use strict';

let middleInyector = require('middle-inyector');
let request = require('supertest');
let expect = require('chai').expect;
let appError = require('./../../../modules/error/manager');
let mock = require('./../../mocks/middlewares/helper/emptyBody');
let config = require('./../../../config/server/config');
let i18n;
let app;

describe('Middleware: empty body', () => {

	before((done) => {
		app = middleInyector('express', mock.dependencies, mock.variables);
		i18n = app.get('i18n');
		done();
	});

	after((done) => {
		done();
	});

	it('Should send code "' + appError('NO_DATA').code + '" with message "' + appError('NO_DATA').message + '" when body data is "undefined"', (done) => {
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
			.expect(404, done)
	});

});
