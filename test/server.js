"use strict";

let assert = require('assert');
const config = require('./../config/server/config.js');
let server = require('./../server.js');

describe('Server', () => {
    describe('APP', () => {

        let serverAppInstance = undefined;
        let serverAppMsg = undefined;
        const serverAppPort = config.app.port;

        beforeEach((done) => {
            server.startApp().then((response) => {
                serverAppInstance = response.instance;
                serverAppMsg = response.msg;
                done();
            });
        });

        afterEach((done) => {
            if (serverAppInstance !== undefined) {
                server.stopApp().then(() => {
                    serverAppInstance = undefined;
                    done();
                });
            } else {
                done();
            }
        });

        it("App UP", (done) => {
            //TODO: Cambiar literales a un JSON
            assert.equal(serverAppMsg, 'Server is up on port ' + serverAppPort);
            done();
        });

        it("App Cheked port", (done) => {
            let serverPort = serverAppInstance.address().port;
            assert(serverPort);
            assert.equal(serverPort, serverAppPort);
            done();
        });

        it("App down", (done) => {
            server.stopApp().then((msg) => {
                //TODO: Cambiar literales a un JSON
                assert.equal(msg, 'APP instance is correctly stoped.');
                serverAppInstance = undefined;
                done();
            });
        });
    });

    describe("MongoDB", () => {

        let mongodbInstance = undefined;
        const configMongoosePort = config.database.mongodb.port;

        beforeEach((done) => {
            server.startMoongose().then((response) => {
                mongodbInstance = response.instance;
                done();
            }, (error) => {
                done();
            });
        });

        afterEach(function (done) {
            if (mongodbInstance.connection._readyState === mongodbInstance.STATES.disconnected) {
                done();
            } else {
                server.stopMongoose().then((response) => {
                    //TODO: valorar cambiar manejador de instancias en server para que maneje las instancias como los start(response.instance)
                    mongodbInstance = undefined;
                    done();
                });
            }
        });

        it("It is up", (done) => {
            let actualConnectionState = mongodbInstance.connection._readyState;
            let connectionStateDefinedByMoongose = mongodbInstance.STATES.connected;

            assert.notEqual(mongodbInstance, undefined);
            assert.equal(actualConnectionState, connectionStateDefinedByMoongose);

            done();
        });

        it("It is down", (done) => {
            server.stopMongoose(mongodbInstance).then((msg) => {
                assert(msg);
                //TODO: Cambiar literales a un JSON
                assert.equal(msg, 'MongoDB instance is correctly stoped.');
                done();
            });
        });

        it("Cheked port", (done) => {
            let mongodbPort = mongodbInstance.connection.port;
            assert(mongodbPort);
            assert(configMongoosePort);
            assert.equal(mongodbPort, configMongoosePort);
            done();
        });
    });

    describe("Redis", () => {

        let redisServerInstance = undefined;
        const configRedisPort = config.database.redis.port;

        beforeEach((done) => {
            server.startRedis().then((response) => {
                redisServerInstance = response.instance;
                done();
            });
        });

        afterEach((done) => {
            if (redisServerInstance !== undefined) {
                server.stopRedis().then((response) => {
                    redisServerInstance = undefined;
                    done();
                });
            } else {
                done();
            }
        });

        it("It's up", (done) => {
            assert.equal(redisServerInstance.connected, true);
            done();
        });

        it("It's down", (done) => {
            server.stopRedis().then((msg) => {
                //TODO: Cambiar literales a un JSON
                assert.equal(msg, 'Redis instance is correctly stoped.');
                redisServerInstance = undefined;
                done();
            });
        });

        it("Cheked port", (done) => {
            let redisPort = redisServerInstance.connectionOption.port;
            assert(redisPort);
            assert(configRedisPort);
            assert.equal(redisPort, configRedisPort);
            done();
        });
    });
});