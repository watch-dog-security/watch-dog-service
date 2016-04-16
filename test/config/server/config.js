'use strict';

let assert = require('assert');
const config = require('./../../../config/server/config.js');

describe('Server config', ()=> {

    describe('App', ()=> {
        it('Should have name of the server is declared', (done) => {
            assert(config.app.name);
            done();
        });

        it('Should have Host value', (done) => {
            assert(config.app.host);
            done();
        });

        it('Should have port value', (done) => {
            assert(config.app.port);
            done();
        });

        it('should have check password value', (done) => {
            assert(config.app.password.check);
            done();
        });
    });

    describe('MongoDB', ()=> {
        it('Should have host value', (done) => {
            assert(config.database.mongodb.host);
            done();
        });

        it('Should have port value', (done) => {
            assert(config.database.mongodb.port);
            done();
        });
    });

    describe('Redis', ()=> {
        it('Should have Host value', (done) => {
            assert(config.database.redis.host);
            done();
        });

        it('Should have port value', (done) => {
            assert(config.database.redis.port);
            done();
        });
    });

    describe('JWT', ()=> {
        it('Should have secret code value', (done) => {
            assert(config.jwt.secret);
            done();
        });

		it('Should have verification value', (done) => {
			assert(config.jwt.verification);
			done();
		});
    });
});
