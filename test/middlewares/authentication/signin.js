'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let signin = require('./../../../middlewares/authentication/signin');
let User = require('./../../../models/user');
let appError = require('./../../../modules/error/manager');
let expect = require('chai').expect;

const bodyParser = require('body-parser');
const mock = require('./../../mocks/middlewares/authentication/signin');
const mongoose = require('mongoose');
const config = require('./../../../config/server/config');

describe('Middleware SignIn: ', () => {
	let app;
	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(signin);
		app.use((error, req, res, next) => {
			return res.status(error.code).send(error.message);
		});

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
		mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error)
						done();
				});
			}
		});
	});

	it('Should user login on system with the correct credentials', (done) => {
		let user = new User(mock.validUserToMongoose);

		user.save((error) => {
			assert.equal(error, undefined);

			if (!error) {
				request(app)
					.post('/')
					.set('Authorization', mock.validAuthenticationHeader)
					.set('Content-Type', 'application/json')
					.send({})
					.expect(404, done);
			}
		});
	});

	it('Should reject with an Error "' + appError('INCORRECT_CREDENTIALS').message + '" when user does not exist on mongodb', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.notExistAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('INCORRECT_CREDENTIALS').message);
				done();
			});
	});

	it('Should reject with an Error "' + appError('INCORRECT_CREDENTIALS').message + '" when user does not include authentication headers', (done) => {
		request(app)
			.post('/')
			.set('Authorization', '')
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('INCORRECT_CREDENTIALS').message);
				done();
			});
	});

	it('Should send an Error "' + appError('AUTH_HEADER_NOT_CORRECT').message + '" when authentication on base64 formation is not correct', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.invalidAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('AUTH_HEADER_NOT_CORRECT').message);
				done();
			});
	});


	it('Should send an Error "' +  appError('USER_OPTIONS').message + '" when authentication header formation is not correct', (done) => {
		request(app)
			.post('/')
			.set('Authorization', mock.invalidFormatedAuthenticationHeader)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('USER_OPTIONS').message);
				done();
			});
	});
});
