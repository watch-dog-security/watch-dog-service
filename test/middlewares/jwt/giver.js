'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let giver = require('./../../../middlewares/jwt/giver.js');
let User = require('./../../../models/user');

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

		mongoose.connect(config.database.mongodb.host, (error)=> {
			if (!error) {
				User.ensureIndexes(function (err) {
					if (!err) {

						redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

						redisInstance.on('connect', ()=> {
							app.set('redisInstance', redisInstance);
							done();
						});
					}
				});
			}

		});
	});

	after((done) => {
		mongoose.connection.db.dropCollection('users', (error, result) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error) {
						//TODO: remove stored keys
						//redisInstance.del(mock.validToken._id);
						//redisInstance.del(mock.invalidToken._id);
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
			.expect(200,done);
	});

	it('should return 401 response when request is undefined', (done) => {
		request(app)
			.post('/')
			.send(undefined)
			.expect(401, done);
	});

	it('should return 401 response when request.signin is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSingin)
			.expect(401, done);
	});

	it('should return 401 response when request.signin._id is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSinginId)
			.expect(401, done);
	});

	it('should return 401 response when request.signin.username is undefined', (done) => {
		request(app)
			.post('/')
			.send(mock.undefinedSinginUsername)
			.expect(401, done);
	});
});
