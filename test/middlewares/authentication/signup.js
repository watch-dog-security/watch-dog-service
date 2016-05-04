'use strict';

let express = require('express');
let request = require('supertest');
let expect = require('chai').expect;
const mongoose = require('mongoose');
const i18n = require('i18n');
let signup = require('./../../../middlewares/authentication/signup');
let appError = require('./../../../modules/error/manager');
const bodyParser = require('body-parser');
const mock = require('./../../mocks/modules/users/user');
const config = require('./../../../config/server/config');
let User;
let UserManager;

describe('Middleware: Signup', () => {
	let app;
	before((done) => {
		i18n.configure({
			directory: __dirname + '/../../../config/locales',
			locales: ['en', 'es'],
			defaultLocale: 'en',
			register: global
		});

		app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.set('i18n', i18n);

		app.use(signup);
		app.use((error, req, res, next) => {
			if (!error) {
				return next();
			}
			return res.status(error.code).send(error.message);
		});

		mongoose.connect(config.database.mongodb.host + ':' + config.database.mongodb.port + '/' + config.database.mongodb.testdb, (error) => {
			UserManager = require('./../../../modules/users/user')(mongoose);
			app.set('UserManager', UserManager);
			if (!error) {
				done();
			}
		});
	});

	after((done) => {
		mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error) {
						done();
					}
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
			.expect(i18n.__('User saved successfully'), done);
	});

	it('should return an error "' + appError('JSON_FORMATION').message + '" when body request is undefined', (done) => {
		request(app)
			.post('/')
			.send()
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('BODY_UNDEFINED').message);
				done();
			});
	});

	it('should return an error "' + appError('JSON_FORMATION').message + '" when json formation is incorrect', (done) => {
		request(app)
			.post('/')
			.send(mock.userJSONUndefinedUsername)
			.end((error, response) => {
				expect(response.error.text).to.contain(appError('JSON_FORMATION').message);
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
