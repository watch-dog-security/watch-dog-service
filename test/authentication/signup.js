"use strict";

let assert = require('assert');
const config = require('./../../config.js');
let signUpMiddleware = require('./../../middlewares/authentication/signup');

describe("SignUp", () => {
    describe("Create users", () => {
        it("Normal user request", (done) => {
            //TODO
            done();
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