'use strict';
let server = require('./../../server');
let mockery = require('mockery');
let configForTest = require('./../../config/server/config.js');

let myHooks = function () {
	this.Before((scenario, callback) => {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		configForTest.database.mongodb.db = configForTest.database.mongodb.testdb;
		mockery.registerMock('./config/server/config.js', configForTest);
		server = require('./../../server');
		server.start().then(() => {
			callback();
		});
	});
};

module.exports = myHooks;
