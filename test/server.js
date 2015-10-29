"use strict";

let assert = require('assert');
const config = require('./../config/server/config.js');
let server = require('./../server.js');

describe('Server', () => {
    describe('APP', () => {

        let serverInstance;
        let serverAPP;

        beforeEach((done) => {
            serverInstance = undefined;
            serverAPP = server;
            done();
        });

        afterEach((done) => {
            done();
        });

        it("Server UP", (done) => {
            serverAPP.startApp()
                .then((response) => {
                    serverInstance = response.instance;
                    assert.notEqual(serverInstance, undefined);
                    serverInstance.close(done);
                });
        });

        it("Cheked port", (done) => {
            let configPort =  config.app.port,
                serverPort = null;

            serverAPP.startApp()
                .then((response) => {
                    serverInstance = response.instance;
                    serverPort = serverInstance.address().port;

                    assert(serverPort);
                    assert(configPort);
                    assert.equal(serverPort,configPort);
                    serverInstance.close(done);
                });
        });

        it("Server down", (done) => {
            serverAPP.startApp()
                .then((response) => {
                    serverInstance = response.instance;
                    serverAPP.stopApp()
                        .then((msg) => {
                            assert(msg);
                            done();
                        });
                });
        });
    });

    describe("MongoDB", () => {

        let mongodbInstance;
        let configPort = config.database.mongodb.port;

        beforeEach((done) => {
            mongodbInstance = undefined;
            done();
        });

        it("It's up", (done) => {
            server.startMoongose()
                .then((response) => {
                    mongodbInstance = response.instance;
                    assert.notEqual(mongodbInstance, undefined);
                    mongodbInstance.disconnect(done);
                });
        });

        it("It's down", (done) => {
            server.startMoongose()
                .then((response) => {
                    mongodbInstance = response.instance;
                    server.stopMongoose()
                        .then((msg) => {
                            assert(msg);
                            done();
                        });
                });
        });

        it("Cheked port", (done) => {
            let mongodbPort;

            server.startMoongose()
                .then((response) => {
                    mongodbInstance = response.instance;
                    mongodbPort = mongodbInstance.connection.port;
                    assert(mongodbPort);
                    assert(configPort);
                    assert.notEqual(mongodbPort, configPort);
                    mongodbInstance.disconnect(done);
                });

            done();
        });
    });

    describe("Redis", () => {

        let redisInstance;
        let configRedisPort = config.database.redis.port;

        beforeEach((done) => {
            redisInstance = undefined;
            done();
        });

        it("It's up", (done) => {
            server.startRedis()
                .then((response) => {
                    redisInstance = response.instance;
                    assert.notEqual(redisInstance,undefined);
                    done();
                });
        });

        it("It's down", (done) =>{
            //TODO
            done();

            /**server.startRedis()
                .then(function(response){
                    redisInstance = response.instance;
                    console.log(redisInstance);
                    //redisInstance;
                    //console.log(redisInstance);
                    assert.equal(redisInstance,undefined);
                    done();
                });**/
        });

        it("Cheked port", (done) => {
            let redisPort;

            server.startRedis()
                .then((response) => {
                    redisInstance = response.instance;
                    redisPort = redisInstance.connectionOption.port;
                    assert(redisPort);
                    assert(configRedisPort);
                    assert.equal(redisPort,configRedisPort);
                    done();
                });
        });
    });

});