'use strict';

let assert = require('assert');
let request = require('supertest');
const config = require('./../../config/server/config.js');

let myStepDefinitionsWrapper = function () {

	//let status;
	//let message;

	this.Given(/^A list of users$/, function (callback) {
		callback();
	});

	this.When(/^(.*) call to (.*) with token (.*)$/, function (user, route, token, callback) {
		request(config.app.host + config.app.port)
			.post(route)
			.set('Content-Type', 'application/json')
			.send({})
			.end((error, response) => {
				console.log(JSON.stringify(error));
				callback();
			});
	});

	this.Then(/^should get (.*)$/, function (status, callback) {
		callback();
	});

};

module.exports = myStepDefinitionsWrapper;
