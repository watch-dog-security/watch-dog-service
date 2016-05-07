'use strict';

let config = require('./../../../config/server/config.json');
let mocks = () => {
};

mocks.fakeServerConfigForRedis = {
	app: {
		name: '1',
		host: '1',
		port: '1',
		password: {
			check: '1'
		}
	},
	jwt: {
		secret: '1'
	},
	database: {
		mongodb: {
			host: '1',
			port: '1'
		},
		redis: {
			host: '1',
			port: '1'
		}
	}
};

mocks.configurationWithoutKey = {
	app: {
		name: process.env.WDS_APP_NAME || config.app.name,
		host: process.env.WDS_APP_HOST || config.app.host,
		port: process.env.WDS_APP_PORT || config.app.port,
		password: {
			check: process.env.WDS_APP_CHECK_PASS || config.app.password.check
		}
	},
	jwt: {
		secret: '',
		verification: process.env.WDS_JWT_SECRET || config.jwt.secret,
		algorithm: process.env.WDS_JWT_ALGORITHM || config.jwt.algorithm
	},
	database: {
		mongodb: {
			host: process.env.WDS_MONGODB_HOST || config.mongodb.host,
			port: process.env.WDS_MONGODB_PORT || config.mongodb.port
		},
		redis: {
			host: process.env.WDS_REDIS_HOST || config.redis.host,
			port: process.env.WDS_REDIS_PORT || config.redis.port
		}
	}
};

mocks.configurationWithoutAlgorithm = {
	app: {
		name: process.env.WDS_APP_NAME || config.app.name,
		host: process.env.WDS_APP_HOST || config.app.host,
		port: process.env.WDS_APP_PORT || config.app.port,
		password: {
			check: process.env.WDS_APP_CHECK_PASS || config.app.password.check
		}
	},
	jwt: {
		secret: process.env.WDS_JWT_SECRET || config.jwt.secret,
		verification: process.env.WDS_JWT_SECRET || config.jwt.secret,
		algorithm: 'algoritmo_inventado'
	},
	database: {
		mongodb: {
			host: process.env.WDS_MONGODB_HOST || config.mongodb.host,
			port: process.env.WDS_MONGODB_PORT || config.mongodb.port
		},
		redis: {
			host: process.env.WDS_REDIS_HOST || config.redis.host,
			port: process.env.WDS_REDIS_PORT || config.redis.port
		}
	}
};

module.exports = mocks;
