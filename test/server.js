"use strict";

let assert = require('assert');
const config = require('./../config.js');
let server = require('./../server.js');

describe(config.app.name, function() {

    describe("APP server", function() {

        let serverInstance;
        let serverAPP;

        beforeEach(function(done){
            serverInstance = undefined;
            serverAPP = server;
            done();
        });

        afterEach(function(done){
            done();
        });

        it("Server UP", function (done) {
            serverAPP.startApp()
                .then(function(response){
                    serverInstance = response.instance;
                    assert.notEqual(serverInstance, undefined);
                    serverInstance.close(done);
                });
        });

        it("Cheked port", function (done) {
            let configPort =  config.app.port,
                serverPort = null;

            serverAPP.startApp()
                .then(function(response){
                    serverInstance = response.instance;
                    serverPort = serverInstance.address().port;

                    assert(serverPort);
                    assert(configPort);
                    assert.equal(serverPort,configPort);
                    serverInstance.close(done);
                });
        });

        it("Server down", function (done){
            serverAPP.startApp()
                .then(function(response){
                    serverInstance = response.instance;
                    serverAPP.stopApp()
                        .then(function(msg){
                            assert(msg);
                            done();
                        });
                });
        });
    });

    describe("MongoDB", function() {

        let mongodbInstance;
        let configPort = config.database.mongodb.port;

        beforeEach(function(done){
            mongodbInstance = undefined;
            done();
        });

        it("It's up", function (done){
            server.startMoongose()
                .then(function(response){
                    mongodbInstance = response.instance;
                    assert.notEqual(mongodbInstance, undefined);
                    mongodbInstance.disconnect(done);
                });
        });

        it("It's down", function (done){
            server.startMoongose()
                .then(function(response){
                    mongodbInstance = response.instance;
                    server.stopMongoose()
                        .then(function(msg){
                            assert(msg);
                            done();
                        });
                });
        });

        it("Cheked port", function (done){
            let mongodbPort;

            server.startMoongose()
                .then(function(response){
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

    describe("Redis", function(){

        let redisInstance;
        let configRedisPort = config.database.redis.port;

        beforeEach(function(done){
            redisInstance = undefined;
            done();
        });

        it("It's up", function (done){
            server.startRedis()
                .then(function(response){
                    redisInstance = response.instance;
                    assert.notEqual(redisInstance,undefined);
                    done();
                });
        });

        it("It's down", function (done){
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

        it("Cheked port", function (done){
            let redisPort;

            server.startRedis()
                .then(function(response){
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