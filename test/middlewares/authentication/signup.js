'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let signup = require('./../../../middlewares/authentication/signup');
let User = require('./../../../models/user');
let AppError = require('./../../../modules/error/manager');
let expect = require('chai').expect;

const bodyParser = require('body-parser');
const mock = require('./../../mocks/modules/users/user');
const mongoose = require('mongoose');
const config = require('./../../../config/server/config');

describe('Middleware: Signup', () => {
	let app;
	before((done) => {
		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(signup);
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
		mongoose.connection.db.dropCollection('users', (error, result) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error)
						done();
				});
			}
		});
	});

	it('should return 200 response if user request save user on mongodb', (done) => {
		request(app)
			.post('/')
			.send(
				mock.userJson
			)
			.expect(200)
			.expect(__('User saved successfully'),done);
	});

	it('should return 401 response when body request is undefined', (done) => {
		request(app)
			.post('/')
			.send(undefined)
			.end((error, response) => {
				expect(response.error.text).to.contain(AppError('BODY_UNDEFINED').message);
				done();
			});
	});

	it('should return 401 response when json formation is incorrect', (done) => {
		request(app)
			.post('/')
			.send(mock.userJSONUndefinedUsername)
			.end((error, response) => {
				expect(response.error.text).to.contain(AppError('JSON_FORMATION').message);
				done();
			});
	});

	it('should return 500 response when mongo can not save the user, repeated username', (done) => {
		request(app)
			.post('/')
			.send(mock.userJson)
			.end((error, response) => {
				expect(response.error.text).to.contain('E11000 duplicate key error');
				done();
			});
	});
});
