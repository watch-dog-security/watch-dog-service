"use strict";

var assert = require('assert');
var config = require('./../config.json');
var server = require('./../server.js');

describe(config.name, function() {

    it("Server UP", function (done) {
        server.startApp()
            .then(function(data){
                console.log(data);
                assert.notEqual(data, undefined);
                done();
            })
            .catch(function (error){
                assert.equal(error, undefined);
                done();
            });
    });

    it("Checked port", function (done) {
        //TODO
        done();
    });

    it("Server down", function (done){
        //TODO
        done();
    });

    it("Duplicate instance", function (done){
        //TODO
        done();
    });

});