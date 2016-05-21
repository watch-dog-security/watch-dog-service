'use strict';

var afterHook = function () {
	this.AfterFeature((scenario, callback) => {
		global.mongoose.connection.db.dropCollection('users', (error) => {
			if (!error) {
				global.server.stop().then(() => {
					callback();
				});
			}
		});
	});
};

module.exports = afterHook;
