'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let payload = require('../../../modules/jwt/payload.js');
let jwt = require('../../../modules/jwt/jwt.js');
let giver = require('../../../middlewares/jwt/giver.js');
const bodyParser = require('body-parser');

describe('Middleware: Giver', () => {
	let app;
	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(giver);
		done();
	});

	after((done) => {
		done();
	});

	it('should return 200 response', (done) => {
		let user = {
			"_id": "1",
			"username": "test"
		};

		let req = {signin: {user: JSON.stringify(user)}};
		console.log(JSON.stringify(req));
		let payloadTest = payload.createPayload(user._id, user.username);
		let encriptedPayloadTest = jwt.encrypt(payloadTest);

		request(app)
			.post('/')
			.set(req)
			.send(req)
			.expect(200)
			.expect(encriptedPayloadTest)
			.end((error, response) => {
				assert(error);
				console.log('error: ' + error.message);
				console.log('response: ' + JSON.stringify(response));
				done();
			});
	});

	it('should return 401 response', (done) => {
		done();
	});
});
