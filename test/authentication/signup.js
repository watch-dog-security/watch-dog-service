"use strict";

let assert = require('assert');
let request = require('request');
let signUpMiddleware = require('./../../middlewares/authentication/signup');
const config = require('./../../config/server/config.js');

describe('SignUp', () => {

    let dataUserRequest;
    let dataUserRequestWithoutPassword;
    let dataUserRequestWithoutName;
    let dataUserRequestWithoutUsername;
    const urlBase = config.app.host + ":" + config.app.port;
    const urlPostSignUp = urlBase + "/authentication/signup";

    before(() => {
        dataUserRequest = {
            'name':'test signup',
            'username':'testsignup',
            'password':'signuptest'
        };

        dataUserRequestWithoutPassword = {
            'name':'test signupWithoutPassword',
            'username':'testsignupWithoutPassword',
            'password':''
        };

        dataUserRequestWithoutName = {
            'name':'',
            'username':'testsignupWithoutName',
            'password':'signuptestWithoutName'
        };

        dataUserRequestWithoutUsername = {
            'name':'test signup WithoutUsername',
            'username':'',
            'password':'SignUpTestWithoutUsername'
        };
    });

    describe("Create users", () => {

        it("Normal user request", (done) => {
            request.post(urlPostSignUp , dataUserRequest, (err,httpResponse,body) =>{
                console.log('prueba:'+err);
                done();
            });
        });

        it("Request without any password", (done) => {
            //TODO
            done();
        });

        it("Request without any username", (done) => {
            //TODO
            done();
        });

        it("Request without any data", (done) => {
            //TODO
            done();
        });
    });

    describe("Check created users in DB", () => {
        it("User with all data", (done) => {
            //TODO
            done();
        });

        it("User without any password", (done) => {
            //TODO
            done();
        });

        it("User without any username", (done) => {
            //TODO
            done();
        });

        it("User without any data", (done) => {
            //TODO
            done();
        });
    });
});