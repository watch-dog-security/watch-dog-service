'use strict';

let assert = require('assert');
let mockery = require('mockery');
let server = require('./../server.js');
let User = require('./../models/user');
let undefinedVar;
const config = require('./../config/server/config');
const i18n = server.i18n;

describe(config.app.name + ' server', () => {
	describe('APP service', () => {

		let serverInstance;
		let serverInstanceMsg;
		let serverInstancePort;
		const serverConfigPort = config.app.port;

		beforeEach((done) => {
			server.startApp().then((response) => {
				serverInstance = response.instance;
				serverInstanceMsg = response.msg;
				serverInstancePort = serverInstance.address().port;
				done();
			});
		});

		afterEach((done) => {
			if (serverInstance) {
				server.stopApp().then((response) => {
					serverInstance = response.instance;
					done();
				});
			} else {
				done();
			}
		});

		it('Should promise startApp resolve and start', (done) => {
			assert(serverInstancePort);
			assert.equal(serverInstanceMsg, i18n.__('Server is up on port ') + serverInstancePort);
			done();
		});

		it('Should App start on port', (done) => {
			assert(serverConfigPort);
			assert(serverInstancePort);
			assert.equal(serverInstancePort, serverConfigPort);
			done();
		});

		it('Should promise stopApp resolve and stop App', (done) => {
			server.stopApp().then((response) => {
				assert.equal(response.msg, i18n.__('APP instance is correctly stoped'));
				serverInstance = response.instance;
				done();
			});
		});
	});

	describe('Mongoose service', () => {

		let mongooseInstance;
		let mongooseInstanceMsg;
		let mongooseInstancePort;
		const mongooseConfigPort = config.database.mongodb.port;

		//TODO: check how to change to Each beacuse that produce and error when server stop and start fast
		before((done) => {
			server.startMongoose().then((response) => {
				User.ensureIndexes(function (error) {
					if (!error) {
						mongooseInstance = response.instance;
						mongooseInstanceMsg = response.msg;
						mongooseInstancePort = mongooseInstance.connection.port;
						done();
					}
				});
			});
		});

		after((done) => {
			if (!mongooseInstance) {
				done();
			} else {
				server.stopMongoose().then((response) => {
					mongooseInstance = response.instance;
					done();
				});
			}
		});

		it('Should promise startMongoose resolve and listening to mongoDB', (done) => {
			let actualConnectionState = mongooseInstance.connection._readyState;
			let connectionStateDefinedByMoongose = mongooseInstance.STATES.connected;

			assert(mongooseInstancePort);
			assert.notEqual(mongooseInstance, undefinedVar);
			assert.equal(actualConnectionState, connectionStateDefinedByMoongose);
			assert.equal(mongooseInstanceMsg, i18n.__('MongoDB is up on port ') + mongooseInstancePort);

			done();
		});

		it('Should startMongoose be listening on port', (done) => {
			assert(mongooseInstancePort);
			assert(mongooseConfigPort);
			assert.equal(mongooseInstancePort, mongooseConfigPort);
			done();
		});

		it('Should promise startMongoose reject with an Error', (done) => {
			server.startMongoose().catch((error) => {
				assert(error);
				done();
			});
		});

		it('Should promise stopMongoose resolve and stop listeing mongodb', (done) => {
			server.stopMongoose().then((response) => {
				assert(response.msg);
				assert.equal(response.msg, i18n.__('MongoDB instance is correctly stoped'));
				mongooseInstance = response.instance;
				done();
			});
		});
	});

	describe('Redis service', () => {

		let redisInstance;
		let redisInstanceMsg;
		let redisInstancePort;
		const redisConfigPort = config.database.redis.port;

		beforeEach((done) => {
			mockery.enable({
				useCleanCache: true,
				warnOnReplace: false,
				warnOnUnregistered: false
			});

			server.startRedis().then((response) => {
				redisInstance = response.instance;
				redisInstanceMsg = response.msg;
				redisInstancePort = redisInstance.connection_options.port;
				done();
			});
		});

		afterEach((done) => {
			mockery.deregisterAll();
			mockery.disable();
			server = require('./../server.js');
			if (!redisInstance) {
				server.stopRedis().then((response) => {
					redisInstance = response.instance;
					done();
				});
			} else {
				done();
			}
		});

		it('Should promise startRedis resolve and listening to redis-server', (done) => {
			assert(redisInstancePort);
			assert.equal(redisInstance.connected, true);
			assert.equal(redisInstanceMsg, i18n.__('Redis is up on port ') + redisInstancePort);
			done();
		});

		it('Should promise startRedis reject with an Error', (done) => {
			mockery.registerMock('./config/server/config.js', {
				app: {
					name: '1',
					host: '1',
					port: '1',
					password: {
						check: '1'
					}
				},
				jwt: {
					secret:'1'
				},
				database: {
					mongodb: {
						host: '1',
						port: '1'
					},
					redis: {
						host: '1',
						port: '1'
					}
				}
			});

			server = require('./../server.js');

			server.startRedis().catch((error) => {
				assert(error);
				done();
			});
		});

		it('Should startRedis be listening on port', (done) => {
			assert(redisInstancePort);
			assert(redisConfigPort);
			assert.equal(redisInstancePort, redisConfigPort);
			done();
		});

		it('Should promise stopRedis resolve and stop listeing redis-server', (done) => {
			server.stopRedis().then((response) => {
				assert.equal(response.msg, i18n.__('Redis instance is correctly stoped'));
				redisInstance = response.instance;
				done();
			});
		});
	});

	describe('Start All', () => {
		it('Should resolve when start all services', (done) => {
			server.start().then((responses) => {
				responses.forEach((response) => {
					assert(response.msg);
					assert.notEqual(response.instance, undefinedVar);

					if (response.name === 'APP') {
						let serverInstancePort = response.instance.address().port;
						assert(serverInstancePort);
						assert.equal(response.msg, i18n.__('Server is up on port ') + serverInstancePort);
					} else if (response.name === 'Mongoose') {
						let mongooseInstancePort = response.instance.connection.port;
						assert(mongooseInstancePort);
						assert.equal(response.msg, i18n.__('MongoDB is up on port ') + mongooseInstancePort);
					} else if (response.name === 'Redis') {
						let redisInstancePort = response.instance.connection_options.port;
						assert(redisInstancePort);
						assert.equal(response.msg, i18n.__('Redis is up on port ') + redisInstancePort);
					}
				});
				done();
			});
		});

		it('Should reject mongoose when start all services', (done) => {
			server.stop().then(() => {
				server.startMongoose().then(() => {
					server.start().catch((error) => {
						assert(error);
						done();
					});
				});
			});
		});
	});

	describe('Stop All', () => {
		it('Should resolve when stop all services', (done) => {
			server.stop().then((responses) => {

				responses.forEach((response) => {
					assert(response.msg);

					if (response.name === 'APP') {
						assert.equal(response.msg, i18n.__('APP instance is correctly stoped'));
					} else if (response.name === 'Mongoose') {
						assert.equal(response.msg, i18n.__('MongoDB instance is correctly stoped'));
					} else if (response.name === 'Redis') {
						assert.equal(response.msg, i18n.__('Redis instance is correctly stoped'));
					}
				});
				done();
			});
		});
	});
});
