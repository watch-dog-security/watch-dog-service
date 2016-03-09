'use strict';

let assert = require('assert');
let payload = require('../../modules/jwt/payload');

describe('Payload', ()=> {

    let userPayload;
	let userPayloadWithoutId;
	let userPayloadWithoutUsername;
	let configurationOfThePayload = {
		_id: '1',
		username: 'UserNamePrueba'
	};

    before((done) => {

		userPayload = payload.createPayload(
			configurationOfThePayload._id,
			configurationOfThePayload.username
		);

		userPayloadWithoutId = payload.createPayload(
			undefined,
			configurationOfThePayload.username
		);

		userPayloadWithoutUsername = payload.createPayload(
			configurationOfThePayload._id,
			undefined
		);

		done();
    });

    it("Should have all values", (done) => {

		let username = userPayload.username;
		let _id = userPayload._id;
		let encripted_at = userPayload.encripted_at;

		assert(username);
		assert(encripted_at);
		assert(_id);

		assert.equal(username, configurationOfThePayload.username);
		assert.equal(_id, configurationOfThePayload._id);

        done();
    });

    it("Should not have username value", (done) => {
		let username = userPayloadWithoutUsername.username;
		let _id = userPayloadWithoutUsername._id;
		let encripted_at = userPayloadWithoutUsername.encripted_at;

		assert(encripted_at);
		assert(_id);

		assert.equal(username, undefined);
		assert.equal(_id, configurationOfThePayload._id);
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
