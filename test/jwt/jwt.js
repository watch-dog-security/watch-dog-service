'use strict';

let assert = require('assert');
let jwt = require('../../modules/jwt/jwt');
let payload = require('../../modules/jwt/payload');
const config = require('./../../config/server/config.js');

describe('JWT', ()=> {

    let userPayload;
    let token = "";

    before((done) => {
        userPayload = payload.createPayload(
            'UserNamePrueba',
            '1234123412341234',
            '1234123412341334'
        );
        done();
    });

    describe('Encrypt', ()=> {
        it("Token should be generated", (done) => {
            assert(token === "");
            token = jwt.encrypt(userPayload);
            assert(token);
            done();
        });
    });

    describe("Decrypt", ()=> {
        it("Token should be corret", (done) => {
            assert(token);
            let data = jwt.decode(token);
            assert(data.username);
            assert(data.created_at);
            assert(data.updated_at);
            done();
        });
    });
});