'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let tokenChecker = require('./../../../middlewares/jwt/tokenChecker');
let UserManager = require('./../../../modules/users/user');
let mock = require('./../../mocks/middlewares/jwt/tokenChecker');
let User = require('./../../../models/user');
let expect = require('chai').expect;
let sinon  = require('sinon');
let httpMocks  = require('node-mocks-http');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const config = require('./../../../config/server/config.js');
const jwt = require('./../../../modules/jwt/jwt');

describe('Middleware tokenChecker: ', () => {
	let app;
	let redisInstance;

	let prepareValidToken = (callback) => {
		let userFromManager = UserManager.parseJsonToUserModel(mock.validUser);
		UserManager.parseUserToPayload(userFromManager).then((parsedUser) => {
			let encryptedJWT = jwt.encrypt(parsedUser);

			userFromManager.save((err)=> {
				if (!err) {
					mock.validToken.token = encryptedJWT;
					mock.validToken.id = userFromManager._id.toString();

					redisInstance.set(mock.validToken.id, mock.validToken.token);
					callback();
				}
			});
		});

	};

	let prepareNotRedisToken = (callback) => {
		let userFromManager = UserManager.parseJsonToUserModel(mock.validUserForInvalidTokenOnRedis);
		UserManager.parseUserToPayload(userFromManager).then((parsedUser) => {
			let encryptedJWT = jwt.encrypt(parsedUser);

			userFromManager.save((err)=> {
				if (!err) {
					mock.notPresentTokenOnRedis.token = encryptedJWT;
					mock.notPresentTokenOnRedis.id = userFromManager._id.toString();
					callback();
				}
			});
		});
	};

	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(tokenChecker);

		mongoose.connect(config.database.mongodb.host, (error)=> {
			if (!error) {
				User.ensureIndexes(function (err) {
					if (!err) {
						redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

						redisInstance.on('connect', ()=> {
							app.set('redisInstance', redisInstance);
							prepareValidToken(() => {
								prepareNotRedisToken(() => {
									done();
								});
							})
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
						redisInstance.del(mock.validToken.id.toString());
						redisInstance.del(mock.notPresentTokenOnRedis.id.toString());

						redisInstance.quit(() => {
							done();
						});
					}
				});
			}
		});
	});

	it('should return true when next is called', (done) => {
		let res = httpMocks.createResponse(app);
		let req = httpMocks.createRequest({
			headers:  {
				token: mock.validToken.token
			},
			app: {
				get: function(name){
					return app.get(name)
				}
			}
		});

		let spy = sinon.spy(() => {
			expect(spy.called).to.be.true;
			done();
		});

		tokenChecker(req, res, spy);
	});

	it('should return 401 response when token is not present', (done) => {
		request(app)
			.post('/')
			.send('token',mock.voidObject)
			.expect(401)
			.end((error, response) => {
				assert.equal(response.error.text, __('Token is not present, please, add it to the header token'));
				done();
			});
	});

	it('should return 401 response when string token is void', (done) => {
		request(app)
			.post('/')
			.set('token',mock.voidStringToken)
			.send({})
			.expect(401)
			.end((error, response) => {
				assert.equal(response.error.text, __('Token is not present, please, add it to the header token'));
				done();
			});
	});

	it('should return 401 response when token is not on redis', (done) => {
		request(app)
			.post('/')
			.set('token',mock.invalidToken.token)
			.send({})
			.expect(401)
			.expect(__('Token is not valid, please, get other'))
			.end((error, response) => {
				assert.equal(response.error.text, __('Token is not valid, please, get other'));
				done();
			});
	});

	it('should return 401 response when token information is not on mongodb', (done) => {
		request(app)
			.post('/')
			.set('token',mock.invalidToken.token)
			.send({})
			.expect(401,done);
	});
});
