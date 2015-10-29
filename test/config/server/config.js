'use strict';

let assert = require('assert');
const config = require('./../../../config/server/config.js');

describe('Server config', ()=> {

    describe('App', ()=> {
        it('Name exist', (done) => {
            assert(config.app.name);
            done();
        });

        it('Host exist', (done) => {
            assert(config.app.host);
            done();
        });

        it('Port exist', (done) => {
            assert(config.app.port);
            done();
        });
    });

    describe('MongoDB', ()=> {
        it('Host exist', (done) => {
            assert(config.database.mongodb.host);
            done();
        });

        it('Port exist', (done) => {
            assert(config.database.mongodb.port);
            done();
        });
    });

    describe('Redis', ()=> {
        it('Host exist', (done) => {
            assert(config.database.redis.host);
            done();
        });

        it('Port exist', (done) => {
            assert(config.database.redis.port);
            done();
        });
    });

    describe('JWT', ()=> {
        it('Secret code exist', (done) => {
            assert(config.jwt.secret);
            done();
        });
    });
});