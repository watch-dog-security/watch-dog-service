"use strict";

let assert = require('assert');
let config = require('./../config.json');
let server = require('./../server.js');

describe(config.name, function() {

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
            let configPort =  config.port,
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
                    serverInstance.close(done)
                });
        });
    });

    describe("MongoDB", function() {

        let mongodbInstance;
        let configPort = config.mongodb.port;

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
                    mongodbInstance.disconnect(function(){
                        assert.notEqual(mongodbInstance, undefined);
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
        it("It's up", function (done){
            //TODO
            done();
        });

        it("It's down", function (done){
            //TODO
            done();
        });

        it("Cheked port", function (done){
            //TODO
            done();
        });
    });

});