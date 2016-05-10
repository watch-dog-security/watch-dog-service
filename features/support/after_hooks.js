'use strict';
let server = require('./../../server');
let mongoose = require('mongoose');

var afterHook = function () {
	this.After((scenario, callback) => {
		server.stop().then((response) => {
			console.log('after is executing' + response);
			callback();
		}).catch((error) => {
			console.log('error:' + error)
		});
	});
};

module.exports = afterHook;
