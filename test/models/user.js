'use strict';

let assert = require('assert');
let User = require('./../../models/user');
const config = require('./../../config/server/config.js');
const mockUserModel = require('./../mocks/models/user.js');
const mongoose = require('mongoose');

describe('User Model', ()=> {

    beforeEach((done) => {
        if (mongoose.connection.db) return done();
        mongoose.connect(config.database.mongodb.host, done);
    });

    describe('Save users', ()=> {
        describe('Check Email', ()=> {
            it('Save a user without the email', function (done) {
				//TODO:
				done();
            });

            it('Save a user without a valid email', function (done) {
				//TODO:
				done();
            });

            it('Save a user with a valid email', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Username', ()=> {
            it('Save a user with a repeted username', function (done) {
                //TODO:
                done();
            });

            it('Save a user without the username', function (done) {
                //TODO:
                done();
            });

            it('Save a user with a repeated username', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Mobile phone', ()=> {
            it('Save a user without a mobile phone', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Code country', ()=> {
            it('Save a user without a code country', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Birthdate', ()=> {
            it('Save a user without a birthdate', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Password', ()=> {
            it('Save a user without a password', function (done) {
                //TODO:
                done();
            });

            it('Save a user without a correct password', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Fullname', ()=> {
            it('Save a user without fullname', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Created at', ()=> {
            it('Save a valid user and check created date', function (done) {
                //TODO:
                done();
            });
        });

        describe('- Updated at', ()=> {
            it('Save a valid user and check if updated at is the same that created at', function (done) {
                //TODO:
                done();
            });
        });
    });

    describe("#Find", ()=> {
        it('Find a user with the email', function (done) {
            //TODO:
            done();
        });

        it('Find a user with the username', function (done) {
            //TODO:
            done();
        });

        it('Find a user with the mobile phone', function (done) {
            //TODO:
            done();
        });
    });


    describe("#Delete", ()=> {
        it('Delete a user with the email', function (done) {
            //TODO:
            done();
        });

        it('Delete a user with the username', function (done) {
            //TODO:
            done();
        });

        it('Delete a user with the mobile phone', function (done) {
            //TODO:
            done();
        });
    });
});
