'use strict';

let assert = require('assert');
let User = require('./../../models/user');
const config = require('./../../config/server/config.js');

describe('User Model', ()=> {

    let validUser = new User({
        fullName: 'Alberto Iglesias Gallego',
        userName: 'albertoig',
        password: 'EnjoyWD8',
        meta: {
            birthdate: '02/06/1988'
        },
        email: 'alberto.uchiha@gmail.com',
        mobilePhone: '606554433',
        codeCountry: '+34'
    });

    let userWithoutEmail = new User({
        fullName: 'Mr.Robot',
        userName: 'mrrobot',
        password: 'ImCr4zy',
        meta: {
            birthdate: '12/05/1981'
        },
        email: 'sami.malek@gmail.com',
        mobilePhone: '606554433',
        codeCountry: '+34'
    });

    let userWrongEmail = new User({
        fullName: 'Christian Bale',
        userName: 'cristbale',
        password: 'AmericanPsyc0',
        meta: {
            birthdate: '30/01/1974'
        },
        email: 'christian.balegmail.com',
        mobilePhone: '617913444',
        codeCountry: '+1'
    });

    beforeEach((done) => {
        if (mongoose.connection.db) return done();
        mongoose.connect(config.database.mongodb.host, done);
    });

    describe('#Save', ()=> {
        describe('- Email', ()=> {
            it('Save a user without the email', function (done) {
                userWithoutEmail.save((error)=>{
                    assert(userWithoutEmail.email === undefined);
                    assert(error === 'Email syntax is not correct.');
                    done();
                });
            });

            it('Save a user without a valid email', function (done) {
                userWrongEmail.save((error)=>{
                    assert(userWithoutEmail.email);
                    assert(error === 'Email syntax is not correct.');
                    done();
                });
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