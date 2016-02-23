'use strict';

let assert = require('assert');
const config = require('./../../../config/server/config.js');

describe('Server config', ()=> {

    describe('App', ()=> {
        it('Name of the server is declared', (done) => {
            assert(config.app.name);
            done();
        });

        it('Host exist', (done) => {
            assert(config.app.host);
            done();
        });

        it('Port is declared', (done) => {
            assert(config.app.port);
            done();
        });

        it('Check password is declared', (done) => {
            assert(config.app.password.check);
            done();
        });
    });

    describe('MongoDB', ()=> {
        it('Host is declared', (done) => {
            assert(config.database.mongodb.host);
            done();
        });

        it('Port is declared', (done) => {
            assert(config.database.mongodb.port);
            done();
        });
    });

    describe('Redis', ()=> {
        it('Host is declared', (done) => {
            assert(config.database.redis.host);
            done();
        });

        it('Port is declared', (done) => {
            assert(config.database.redis.port);
            done();
        });
    });

    describe('JWT', ()=> {
        it('Secret code is declared', (done) => {
            assert(config.jwt.secret);
            done();
        });
    });
});