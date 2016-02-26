'use strict';

let assert = require('assert');
let server = require('./../server.js');
const config = require('./../config/server/config.js');

describe('Server', () => {
    describe('APP', () => {

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

        it("App UP", (done) => {
            assert(serverInstancePort);
            assert.equal(serverInstanceMsg, __('Server is up on port ') + serverInstancePort);
            done();
        });

        it("App Cheked port", (done) => {
            assert(serverConfigPort);
            assert(serverInstancePort);
            assert.equal(serverInstancePort, serverConfigPort);
            done();
        });

        it("App down", (done) => {
            server.stopApp().then((response) => {
                assert.equal(response.msg, __('APP instance is correctly stoped'));
				assert.equal(response.instance, undefined);
				serverInstance = response.instance;
                done();
            });
        });
    });

    describe("MongoDB", () => {

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

        it("It is up", (done) => {
            let actualConnectionState = mongooseInstance.connection._readyState;
            let connectionStateDefinedByMoongose = mongooseInstance.STATES.connected;

            assert(mongooseInstancePort);
            assert.notEqual(mongooseInstance, undefined);
            assert.equal(actualConnectionState, connectionStateDefinedByMoongose);
            assert.equal(mongooseInstanceMsg, __('MongoDB is up on port ') + mongooseInstancePort);

            done();
        });

        it("It is down", (done) => {
            server.stopMongoose().then((response) => {
                assert(response.msg);
                assert.equal(response.msg, __('MongoDB instance is correctly stoped'));
				assert.equal(response.instance, undefined);
				mongooseInstance = response.instance;
                done();
            });
        });

        it("Cheked port", (done) => {
            assert(mongooseInstancePort);
            assert(mongooseConfigPort);
            assert.equal(mongooseInstancePort, mongooseConfigPort);
            done();
        });
    });

    describe("Redis", () => {

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

        it("It's up", (done) => {
            assert(redisInstancePort);
            assert.equal(redisInstance.connected, true);
            assert.equal(redisInstanceMsg, __('Redis is up on port ') + redisInstancePort);
            done();
        });

        it("It's down", (done) => {
            server.stopRedis().then((response) => {
                assert.equal(response.msg, __('Redis instance is correctly stoped'));
                assert.equal(response.instance, undefined);
				redisInstance = response.instance;
                done();
            });
        });

        it("Cheked port", (done) => {
            assert(redisInstancePort);
            assert(redisConfigPort);
            assert.equal(redisInstancePort, redisConfigPort);
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
