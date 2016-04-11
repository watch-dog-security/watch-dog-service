"use strict";

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let signin = require('./../../../middlewares/authentication/signin');
let User = require('./../../../models/user');

const bodyParser = require('body-parser');
const mock = require('./../../mocks/middlewares/authentication/signin');
const mongoose = require('mongoose');
const config = require('./../../../config/server/config');

describe("Middleware SignIn: ", () => {
	let app;
	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(signin);

		mongoose.connect(config.database.mongodb.host, (error)=> {
			if (!error) {
				User.ensureIndexes(function (err) {
					if (!err) {

						done();
					}
				});
			}

		});
	});

	after((done) => {
		mongoose.connection.db.dropCollection('users', (error, result) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error)
						done();
				});
			}
		});
	});

	it("Should user login on system with the correct credentials", (done) => {
		let user = new User(mock.validUserToMongoose);

		user.save((error) => {
			assert.equal(error, undefined);

			if (!error){
				request(app)
					.post('/')
					.set('Authorization', mock.validAuthenticationHeader)
					.set('Content-Type',  'application/json')
					.send(mock.validRequest)
					.expect(404, done);
			}
		});
	});

	it("Should reject with an Error when user does not exist on mongodb", (done) => {
		//TODO
		done();
	});

	it("Should reject with an Error when user does not include authentication headers", (done) => {
		request(app)
			.post('/')
			.send(undefined)
			.expect(401, done);
	});

	it("Request without any data", (done) => {
		//TODO
		done();
	});
});
