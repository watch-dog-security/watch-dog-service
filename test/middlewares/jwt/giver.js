'use strict';

let middleInjector = require('middle-injector');
let request = require('supertest');
const mongoose = require('mongoose');
const redis = require('redis');
let expect = require('chai').expect;
const config = require('./../../../config/server/config.js');
const mock = require('./../../mocks/middlewares/jwt/giver');
let giver = require('./../../../middlewares/jwt/giver');
let appError = require('./../../../modules/error/manager');

let app;
let UserManager;
let redisInstance;

describe('Middleware Giver: ', () => {


	before((done) => {
		app = middleInjector('express', mock.dependencies, mock.variables);

		mongoose.connect(config.database.mongodb.host + ':' + config.database.mongodb.port + '/' + config.database.mongodb.testdb, (error) => {
			if (!error) {
				redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

				redisInstance.on('connect', () => {
					UserManager = require('./../../../modules/users/user')(mongoose);
					app.set('UserManager', UserManager);
					app.set('redisInstance', redisInstance);
					done();
				});
			}

		});
	});

	after((done) => {
		delete mongoose.connection.models['User'];
		mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error) {
						//TODO: remove stored keys
						redisInstance.del(mock.validUser._id);
						redisInstance.quit(() => {
							done();
						});
					}
				});
			}
		});
	});

	it('should return 200 response when request is correct', (done) => {
		request(app)
			.post('/')
			.send(mock.validRequest)
			.expect(200, done);
	});

	it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" when request is undefined', (done) => {
		request(app)
			.post('/')
			.send()
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('WRONG_USER_FROM_REQUEST').message);
				done();
			});
	});

	it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" when request.signin is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSingin)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('WRONG_USER_FROM_REQUEST').message);
				done();
			});
	});

	it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" when request.signin._id is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSinginId)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('WRONG_USER_FROM_REQUEST').message);
				done();
			});
	});

	it('should return an error "' + appError('WRONG_USER_FROM_REQUEST').message + '" when request.signin.username is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSinginUsername)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('WRONG_USER_FROM_REQUEST').message);
				done();
			});
	});
});
