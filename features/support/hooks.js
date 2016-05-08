'use strict';
let server = require('./../../server');

let myHooks = function () {
	this.Before((scenario, callback) => {
		server.start().then(() => {
			callback();
		});
	});
};

module.exports = myHooks;
