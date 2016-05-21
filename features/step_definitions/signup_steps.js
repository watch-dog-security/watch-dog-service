'use strict';

let assert = require('assert');
let request = require('supertest');
let expect = require('chai').expect;
const config = require('./../../config/server/config.js');

var myStepDefinitionsWrapper = function () {

	const url = config.app.host + ':' + config.app.port;
	let statusCodeFromCall;
	let messageFromCall;
	let route;

	this.Given(/^A user trying to signup on the route "\/auth\/signup"$/, function (callback) {
		route = '/auth/signup';
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

	this.Then(/^code "([^"]*)"$/, function (statusCode, callback) {
		assert.equal(statusCode, statusCodeFromCall.toString());
		callback();
	});

	this.Then(/^he should receive the message "([^"]*)"$/, function (message, callback) {
		//assert.equal(message, messageFromCall);
		expect(messageFromCall).to.contains(message);
        callback();
    });
};

module.exports = myStepDefinitionsWrapper;
