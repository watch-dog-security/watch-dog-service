'use strict';

let assert = require('assert');
let mockery = require('mockery');
let server = require('./../server.js');
let User = require('./../models/user');
const config = require('./../config/server/config');

describe(config.app.name + ' server', () => {
	describe('APP service', () => {

		let serverInstance = undefined;
		let serverInstanceMsg = undefined;
		let serverInstancePort = undefined;
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
			if (serverInstance !== undefined) {
				server.stopApp().then((response) => {
					serverInstance = response.instance;
					done();
				});
			} else {
				done();
			}
		});

		it("Should promise startApp resolve and start", (done) => {
			assert(serverInstancePort);
			assert.equal(serverInstanceMsg, __('Server is up on port ') + serverInstancePort);
			done();
		});

		it("Should App start on port", (done) => {
			assert(serverConfigPort);
			assert(serverInstancePort);
			assert.equal(serverInstancePort, serverConfigPort);
			done();
		});

		it("Should promise stopApp resolve and stop App", (done) => {
			server.stopApp().then((response) => {
				assert.equal(response.msg, __('APP instance is correctly stoped'));
				assert.equal(response.instance, undefined);
				serverInstance = response.instance;
				done();
			});
		});
	});

	describe("Mongoose service", () => {

		let mongooseInstance = undefined;
		let mongooseInstanceMsg = undefined;
		let mongooseInstancePort = undefined;
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

		after(function (done) {
			if (mongooseInstance === undefined) {
				done();
			} else {
				server.stopMongoose().then((response) => {
					mongooseInstance = response.instance;
					done();
				});
			}
		});

		it("Should promise startMongoose resolve and listening to mongoDB", (done) => {
			let actualConnectionState = mongooseInstance.connection._readyState;
			let connectionStateDefinedByMoongose = mongooseInstance.STATES.connected;

			assert(mongooseInstancePort);
			assert.notEqual(mongooseInstance, undefined);
			assert.equal(actualConnectionState, connectionStateDefinedByMoongose);
			assert.equal(mongooseInstanceMsg, __('MongoDB is up on port ') + mongooseInstancePort);

			done();
		});

		it("Should startMongoose be listening on port", (done) => {
			assert(mongooseInstancePort);
			assert(mongooseConfigPort);
			assert.equal(mongooseInstancePort, mongooseConfigPort);
			done();
		});

		it("Should promise startMongoose reject with an Error", (done) => {
			server.startMongoose().catch((error) => {
				assert(error);
				done();
			});
		});

		it("Should promise stopMongoose resolve and stop listeing mongodb", (done) => {
			server.stopMongoose().then((response) => {
				assert(response.msg);
				assert.equal(response.msg, __('MongoDB instance is correctly stoped'));
				assert.equal(response.instance, undefined);
				mongooseInstance = response.instance;
				done();
			});
		});

		it("Should promise stopMongoose reject with an Error", (done) => {
			server.stopMongoose().catch((error) => {
				assert(error);
				done();
			});
		});
	});

	describe("Redis service", () => {

		let redisInstance = undefined;
		let redisInstanceMsg = undefined;
		let redisInstancePort = undefined;
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
			if (redisInstance !== undefined) {
				server.stopRedis().then((response) => {
					redisInstance = response.instance;
					done();
				});
			} else {
				done();
			}
		});

		it("Should promise startRedis resolve and listening to redis-server", (done) => {
			assert(redisInstancePort);
			assert.equal(redisInstance.connected, true);
			assert.equal(redisInstanceMsg, __('Redis is up on port ') + redisInstancePort);
			done();
		});

		it("Should promise startRedis reject with an Error", (done) => {
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

		it("Should startRedis be listening on port", (done) => {
			assert(redisInstancePort);
			assert(redisConfigPort);
			assert.equal(redisInstancePort, redisConfigPort);
			done();
		});

		it("Should promise stopRedis resolve and stop listeing redis-server", (done) => {
			server.stopRedis().then((response) => {
				assert.equal(response.msg, __('Redis instance is correctly stoped'));
				assert.equal(response.instance, undefined);
				redisInstance = response.instance;
				done();
			});
		});
	});

	describe("Start All", () => {
		it("Should resolve when start all services", (done) => {
			server.start().then((responses) => {
				responses.forEach((response) => {
					assert(response.msg);
					assert.notEqual(response.instance, undefined);

					if (response.name === 'APP') {
						let serverInstancePort = response.instance.address().port;
						assert(serverInstancePort);
						assert.equal(response.msg, __('Server is up on port ') + serverInstancePort);
					} else if (response.name === 'Mongoose') {
						let mongooseInstancePort = response.instance.connection.port;
						assert(mongooseInstancePort);
						assert.equal(response.msg, __('MongoDB is up on port ') + mongooseInstancePort);
					} else if (response.name === 'Redis') {
						let redisInstancePort = response.instance.connection_options.port;
						assert(redisInstancePort);
						assert.equal(response.msg, __('Redis is up on port ') + redisInstancePort);
					}
				});
				done();
			});
		});

		it("Should reject mongoose when start all services", (done) => {
			done();
		});
	});

	describe("Stop All", () => {
		it("Should resolve when stop all services", (done) => {
			server.stop().then((responses) => {

				responses.forEach((response) => {
					assert(response.msg);
					assert.equal(response.instance, undefined);

					if (response.name === 'APP') {
						assert.equal(response.msg, __('APP instance is correctly stoped'));
					} else if (response.name === 'Mongoose') {
						assert.equal(response.msg, __('MongoDB instance is correctly stoped'));
					} else if (response.name === 'Redis') {
						assert.equal(response.msg, __('Redis instance is correctly stoped'));
					}
				});
				done();
			});
		});

		it("Should reject mongoose when start all services", (done) => {
			done();
		});
	});
});
