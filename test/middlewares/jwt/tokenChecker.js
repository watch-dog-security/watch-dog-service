'use strict';

let express = require('express');
let request = require('supertest');
let tokenChecker = require('./../../../middlewares/jwt/tokenChecker');
let UserManager = require('./../../../modules/users/user');
let mock = require('./../../mocks/middlewares/jwt/tokenChecker');
let User = require('./../../../models/user');
let expect = require('chai').expect;
let sinon = require('sinon');
let httpMocks = require('node-mocks-http');
let appError = require('./../../../modules/error/manager');

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
		const payload = UserManager.parseUserToPayload(userFromManager);
		const encryptedJWT = jwt.encrypt(payload);

		userFromManager.save((err)=> {
			if (!err) {
				mock.validToken.token = encryptedJWT;
				mock.validToken.id = userFromManager._id.toString();

				redisInstance.set(mock.validToken.id, mock.validToken.token);
				callback();
			}
		});
	};

	let prepareNotRedisToken = (callback) => {
		let userFromManager = UserManager.parseJsonToUserModel(mock.validUserForInvalidTokenOnRedis);

		const payload = UserManager.parseUserToPayload(userFromManager);
		const encryptedJWT = jwt.encrypt(payload);
		userFromManager.save((err)=> {
			if (!err) {
				mock.notPresentTokenOnRedis.token = encryptedJWT;
				mock.notPresentTokenOnRedis.id = userFromManager._id.toString();
				callback();
			}
		});
	};

	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(tokenChecker);
		app.use((error, req, res, next) => {
			return res.status(error.code).send(error.message);
		});

		mongoose.connect(config.database.mongodb.host, (error)=> {
			if (!error) {
				User.ensureIndexes(function (err) {
					if (!err) {
						redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

						redisInstance.on('connect', () => {
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
		mongoose.connection.db.dropCollection('users', (error) => {
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
			headers: {
				token: mock.validToken.token
			},
			app: {
				get: function (name) {
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

	it('should return an Error "' + appError('TOKEN_NOT_VALID').message + '" when token is not on redis', (done) => {
		let token = jwt.encrypt(mock.invalidUser);

		request(app)
			.post('/')
			.set('token', token)
			.send({})
			.expect(401)
			.expect(__('Token is not valid, please, get other'))
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('TOKEN_NOT_VALID').message);
				done();
			});
	});

	it('should return an Error "' + appError('SIGNATURE_VERIFICATION').message + '" when token signature is not correct', (done) => {
		request(app)
			.post('/')
			.set('token', mock.tokenSignedWithOtherPassword)
			.send({})
			.expect(401)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('SIGNATURE_VERIFICATION').message);
				done();
			});
	});

	it('Should return an Error "' + appError('TOKEN_NOT_SUPPLIED').message + '" when token is not supplied', (done) => {
		request(app)
			.post('/')
			.set('token', mock.voidStringToken)
			.send({})
			.expect(401)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('TOKEN_NOT_SUPPLIED').message);
				done();
			});
	});

	it('Should return an Error "' + appError('TOKEN_NOT_SUPPLIED').message + '" when token is void object', (done) => {
		request(app)
			.post('/')
			.send('token', mock.voidObject)
			.expect(401)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('TOKEN_NOT_SUPPLIED').message);
				done();
			});
	});

	it('should return 401 response when token information is not on mongodb', (done) => {
		//TODO
		done();
		/**request(app)
		 .post('/')
		 .set('token',mock.invalidToken.token)
		 .send({})
		 .expect(401,done);**/
	});
});
