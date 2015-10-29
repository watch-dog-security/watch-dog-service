'use strict';

let assert = require('assert');
let payload = require('../../modules/jwt/payload');

describe('Payload', ()=> {

    let userPayload;

    before(() => {
        userPayload = payload.createPayload(
            'UserNamePrueba',
            '1234123412341234',
            '1234123412341334'
        )
    });

    it("Should have all values", (done) => {
        assert(userPayload.username);
        assert(userPayload.created_at);
        assert(userPayload.updated_at);
        done();
    });

    it("Should not have username value", (done) => {
        userPayload.username = "";
        assert(userPayload.username === "");
        done();
    });

    it("Should not have create date value", (done) => {
        userPayload.created_at = "";
        assert(userPayload.created_at === "");
        done();
    });


    it("Should not have update date value", (done) => {
        userPayload.updated_at = "";
        assert(userPayload.updated_at === "");
        done();
    });
});