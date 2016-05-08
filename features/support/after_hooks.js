'use strict';
let server = require('./../../server');

var afterHook = function () {
	this.After((scenario, callback) => {
		server.stop().then(() => {
			callback();
		});
	});
};

module.exports = afterHook;
