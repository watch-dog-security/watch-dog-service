'use strict';

let middleInyector = require('middle-inyector');
let request = require('supertest');
let mongoose = require('mongoose');
let expect = require('chai').expect;
let UserManager;
let i18n;
let app;

const mock = require('./../../mocks/modules/users/user');
const config = require('./../../../config/server/config');
const mockSignup = require('./../../mocks/middlewares/authentication/signup');
const appError = require('./../../../modules/error/manager');

describe('Middleware: Signup', () => {
	before((done) => {
		app = middleInyector('express', mockSignup.dependencies, mockSignup.variables);
		i18n = app.get('i18n');

		mongoose.connect(config.database.mongodb.host + ':' + config.database.mongodb.port + '/' + config.database.mongodb.testdb, (error) => {
			UserManager = require('./../../../modules/users/user')(mongoose);
			app.set('UserManager', UserManager);
			if (!error) {
				done();
			}
		});
	});

	after((done) => {
		delete mongoose.connection.models['User'];
		mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error) {
						done();
					}
				});
			}
		});
	});

	it('should return 200 response if user request save user on mongodb', (done) => {
		request(app)
			.post('/')
			.send(mock.userJson)
			.expect(200)
			.expect(i18n.__('User saved successfully'), done);
	});

	it('should return an error "' + appError('JSON_FORMATION').message + '" when body request is undefined', (done) => {
		request(app)
			.post('/')
			.send()
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('BODY_UNDEFINED').message);
				done();
			});
	});

	it('should return an error "' + appError('JSON_FORMATION').message + '" when json formation is incorrect', (done) => {
		request(app)
			.post('/')
			.send(mock.userJSONUndefinedUsername)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('JSON_FORMATION').message);
				done();
			});
	});

	it('should return 500 response when mongo can not save the user, repeated username', (done) => {
		request(app)
			.post('/')
			.send(mock.userJson)
			.end((error, response) => {
				expect(response.error.text).to.contain('E11000 duplicate key error');
				done();
			});
	});
});
