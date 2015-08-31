var assert = require('assert');
var config = require('./../config.json');
var server = require('../server.js');

describe(config.name, function() {

    var app;

    it("Server should be running", function (done) {
        server.start(function(err,watchdog){
            assert.equal(err, undefined);
            app = watchdog;
            done();
        });
    });

    it("Server should be stoped", function (done){
        server.stop(app,function(err){
            assert.equal(err, undefined);
            done();
        });
    });

    //TODO:CHECK PORT CONECTION
});