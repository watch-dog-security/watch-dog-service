'use strict';

let assert = require('assert');
let request = require('request');
let signUpMiddleware = require('./signup');
let server = require('./../../server.js');
let user = require('./../../models/user');
let expect = require('chai').expect;

const config = require('./../../../config/server/config.js');

describe('SignUp', () => {
/**
	const userRequest = +'testSignUp';
	const userRequestNoPassword = 'testSignUpWithoutPassword';
	const userRequestNoName = 'testSignUpWithoutName';
	const userRequestNoUsername = '';
	const urlBase = config.app.host + ':' + config.app.port;
	const urlPostSignUp = urlBase + '/auth/signup';

	let dataUserRequest;
	let dataUserRequestWithoutPassword;
	let dataUserRequestWithoutName;
	let dataUserRequestWithoutUsername;

	before((done) => {
		server.startApp()
			.then((response) => {
				dataUserRequest = {
					'name': 'test signup',
					'username': userRequest,
					'password': 'SignUpTest'
				};

				dataUserRequestWithoutPassword = {
					'name': 'test signupWithoutPassword',
					'username': userRequestNoPassword,
					'password': ''
				};

				dataUserRequestWithoutName = {
					'name': '',
					'username': userRequestNoName,
					'password': 'SignUpTestWithOutName'
				};

				dataUserRequestWithoutUsername = {
					'name': 'test signup WithoutUsername',
					'username': userRequestNoUsername,
					'password': 'SignUpTestWithOutUserName'
				};
				done(response);
			});

	});

	after(()=> {
		server.stopApp().then((response) => {
			done(response);
		});
	});

	describe('Create users', () => {
		it('Normal user request', (done) => {
			request.post(urlPostSignUp, {json: true}, (error, httpResponse, body) => {
				//assert(!error);
				//assert(httpResponse.statusCode == 200)
				done();
			});
		});

		it('Request without any password', (done) => {
			//TODO
			done();
		});

		it('Request without any username', (done) => {
			//TODO
			done();
		});

		it('Request without any data', (done) => {
			//TODO
			done();
		});
	});

	describe('Check created users in DB', () => {
		it('User with all data', (done) => {
			//TODO
			done();
		});

		it('User without any password', (done) => {
			//TODO
			done();
		});

		it('User without any username', (done) => {
			//TODO
			done();
		});

		it('User without any data', (done) => {
			//TODO
			done();
		});
	});**/
});
