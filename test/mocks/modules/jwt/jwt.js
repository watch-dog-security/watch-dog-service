'use strict';

let mocks = () => {};
let config = require('./../../../../config/server/config.json');

mocks.signatureVerification = {};

mocks.configurationOfThePayload = {
	_id: '1',
	username: 'UserNamePrueba'
};

mocks.configurationOfThePayloadTokenNotActive = {
	_id: '1',
	username: 'UserNamePrueba',
	nbf: Date.now() / 1000 + 1
};

mocks.configurationOfThePayloadTokenExpired = {
	_id: '1',
	username: 'UserNamePrueba',
	exp: Date.now() / 1000 - 1
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

mocks.tokenSignedWithOtherPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

module.exports = mocks;
