'use strict';

let middleInyector = require('middle-inyector');
let request = require('supertest');
let assert = require('assert');
let mongoose = require('mongoose');
let expect = require('chai').expect;
let appError = require('./../../../modules/error/manager');
let mock = require('./../../mocks/middlewares/authentication/signin');
const config = require('./../../../config/server/config');

let UserManager;

describe('Middleware SignIn: ', () => {
	let app;

	before((done) => {
		app = middleInyector('express', mock.dependencies, mock.variables);
		mongoose.Promise = global.Promise;
		mongoose.connect(config.database.mongodb.host + ':' + config.database.mongodb.port + '/' + config.database.mongodb.testdb, (error) => {
			if (!error) {
				UserManager = require('./../../../modules/users/user')(mongoose);
				app.set('UserManager', UserManager);
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

	it('Should user login on system with the correct credentials', (done) => {
		let user = UserManager.getUserFromJSON(mock.validUserToMongoose);

		user.save((error) => {
			assert(!error);

			if (!error) {
				request(app)
					.post('/')
					.set('Authorization', mock.validAuthenticationHeader)
					.set('Content-Type', 'application/json')
					.send({})
					.expect(404, done);
			}
		});
	});

	it('Should reject with an Error "' + appError('INCORRECT_CREDENTIALS').message + '" when user does not exist on mongodb', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.notExistAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('INCORRECT_CREDENTIALS').message);
				done();
			});
	});

	it('Should reject with an Error "' + appError('INCORRECT_CREDENTIALS').message + '" when user does not include authentication headers', (done) => {
		request(app)
			.post('/')
			.set('Authorization', '')
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('INCORRECT_CREDENTIALS').message);
				done();
			});
	});

	it('Should send an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authentication on base64 formation is not correct', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.invalidAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('AUTH_HEADER_NOT_CORRECT').message);
				done();
			});
	});


	it('Should send an Error "' +  appError('USER_OPTIONS').message + '" when authentication header formation is not correct', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.invalidFormatedAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('USER_OPTIONS').message);
				done();
			});
	});
});
