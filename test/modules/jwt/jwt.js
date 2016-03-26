'use strict';

let assert = require('assert');
let jwt = require('./../../../modules/jwt/jwt');
let payload = require('./../../../modules/jwt/payload');
const config = require('./../../../config/server/config');

describe('JWT module', ()=> {

	let userPayload;
	let token = "";
	let configurationOfThePayload = {
		_id: '1',
		username: 'UserNamePrueba'
	};

	before((done) => {
		userPayload = payload.createPayload(
			configurationOfThePayload._id,
			configurationOfThePayload.username
		);
		done();
	});

	describe('Check function Encrypt', ()=> {
		it("Token should be generated", (done) => {
			assert(token === "");
			token = jwt.encrypt(userPayload);
			assert(token);
			done();
		});
	});

	describe("Check function Decrypt", ()=> {
		it("Token should be correct", (done) => {
			assert(token);
			let data = jwt.decode(token);
			let username = data.username;
			let _id = data._id;
			let encripted_at = data.encripted_at;

			assert(username);
			assert(encripted_at);
			assert(_id);

			assert.equal(username, configurationOfThePayload.username);
			assert.equal(_id, configurationOfThePayload._id);

			done();
		});
	});
});
