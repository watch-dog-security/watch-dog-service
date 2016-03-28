'use strict';

let assert = require('assert');
let server = require('./../server.js');
const config = require('./../config/server/config.js');

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

		it("Should promise startApp reject with an Error", (done) => {
			//TODO:
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

		it("Should promise stopApp reject with an Error", (done) => {
			//TODO:
			done();
		});
    });

    describe("Mongoose service", () => {

        let mongooseInstance = undefined;
        let mongooseInstanceMsg = undefined;
        let mongooseInstancePort = undefined;
        const mongooseConfigPort = config.database.mongodb.port;

        beforeEach((done) => {
            server.startMongoose().then((response) => {
                mongooseInstance = response.instance;
                mongooseInstanceMsg = response.msg;
                mongooseInstancePort = mongooseInstance.connection.port;
                done();
            });
        });

        afterEach(function (done) {
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
			//TODO:
			done();
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
			//TODO:
			done();
		});
    });

    describe("Redis service", () => {

        let redisInstance = undefined;
        let redisInstanceMsg = undefined;
        let redisInstancePort = undefined;
        const redisConfigPort = config.database.redis.port;

        beforeEach((done) => {
            server.startRedis().then((response) => {
                redisInstance = response.instance;
                redisInstanceMsg = response.msg;
                redisInstancePort = redisInstance.connectionOption.port;
                done();
            });
        });

        afterEach((done) => {
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
			//TODO:
			done();
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

		it("Should promise stopRedis reject with an Error", (done) => {
			//TODO:
			done();
		});
    });

    describe("Run All", () => {
        it("Start all", (done) => {

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
                        let redisInstancePort = response.instance.connectionOption.port;
                        assert(redisInstancePort);
                        assert.equal(response.msg, __('Redis is up on port ') + redisInstancePort);
                    }
                });
                done();
            });
        });

        it("Stop all", (done) => {
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
    });
});
