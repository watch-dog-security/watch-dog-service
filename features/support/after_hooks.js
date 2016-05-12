'use strict';
let server = require('./../../server');
let mongoose = require('mongoose');

var afterHook = function () {
	this.After((scenario, callback) => {
		global.mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				global.server.stop().then(() => {
					callback();
				})
			}
		});
	});
};

module.exports = afterHook;
