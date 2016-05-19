'use strict';

let assert = require('assert');
let request = require('supertest');
const config = require('./../../config/server/config.js');

var myStepDefinitionsWrapper = function () {

	const url = config.app.host + ':' + config.app.port;
	let statusCodeFromCall;
	let messageFromCall;
	let route;

	this.Given(/^A user trying to signup on the route "\/auth\/signup"$/, function (route, callback) {
		route = this.route;
		callback()
	});

	this.When(/^he send his (.*)$/, function (jsonUser, callback) {
		request(url)
			.post(route)
			.set('Content-Type', 'application/json')
			.send(jsonUser)
			.end((error, response) => {
				assert(!error);
				statusCodeFromCall = response.res.statusCode;
				messageFromCall = response.res.text;
				callback();
			});
	});

	this.Then(/^he should receive the message "([^"]*)" with code "([^"]*)"$/, function (message, statusCode, callback) {
		assert.equal(statusCode, statusCodeFromCall.toString());
		assert.equal(message, messageFromCall);
		callback();
	});
};

module.exports = myStepDefinitionsWrapper;
