'use strict';

let express = require('express');
let request = require('supertest');
let giver = require('./../../../middlewares/jwt/giver');
let appError = require('./../../../modules/error/manager');
let expect = require('chai').expect;
let UserManager;

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const config = require('./../../../config/server/config.js');
const mock = require('./../../mocks/middlewares/jwt/giver');

describe('Middleware Giver: ', () => {
	let app;
	let redisInstance;

	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(giver);
		app.use((error, req, res, next) => {
			if (!error) {
				return next();
			}
			return res.status(error.code).send(error.message);
		});

		mongoose.connect(config.database.mongodb.host + ':' + config.database.mongodb.port + '/' + config.database.mongodb.testdb, (error) => {
			if (!error) {
				redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

				redisInstance.on('connect', () => {
					app.set('redisInstance', redisInstance);
					UserManager = require('./../../../modules/users/user')(mongoose);
					app.set('UserManager', UserManager);
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
