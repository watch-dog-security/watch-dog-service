'use strict';

let assert = require('assert');
let request = require('supertest');
const config = require('./../../config/server/config.js');

var myStepDefinitionsWrapper = function () {

	let statusCodeFromCall;
	let messageFromCall;

	this.Given(/^A new user try to signup$/, function (callback) {
		callback();
	});

	this.When(/^new user with json (.*) call to "\/auth\/signup"$/, function (jsonUser, callback) {
		request(config.app.host + ':' + config.app.port)
			.post('/auth/signup')
			.set('Content-Type', 'application/json')
			.send(jsonUser)
			.end((error, response) => {
				assert(!error);
				statusCodeFromCall = response.res.statusCode;
				messageFromCall = response.res.text;
				callback();
			});
	});

	this.Then(/^should user create and get status "([^"]*)" and message "([^"]*)"$/, function (statusCode, message, callback) {
		assert.equal(statusCode, statusCodeFromCall.toString());
		assert.equal(message, messageFromCall);
		callback();
	});
};

module.exports = myStepDefinitionsWrapper;
