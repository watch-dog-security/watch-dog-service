'use strict';

let express = require('express');
let request = require('supertest');
let assert = require('assert');
let tokenChecker = require('./../../../middlewares/jwt/giver.js');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const config = require('./../../../config/server/config.js');
const mock = require('./../../mocks/middlewares/jwt/tokenChecker');

describe('Middleware tokenChecker: ', () => {
	let app;
	let redisInstance;

	before((done) => {
		/**app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(tokenChecker);

		mongoose.connect(config.database.mongodb.host, (error)=> {
			if (!error) {
				User.ensureIndexes(function (err) {
					if (!err) {

						redisInstance = redis.createClient(config.database.redis.port, config.database.redis.host);

						redisInstance.on('connect', ()=> {
							app.set('redisInstance', redisInstance);
							done();
						});
					}
				});
			}

		});**/
	});

	after((done) => {
		/**mongoose.connection.db.dropCollection('users', (error, result) => {
			if (!error) {
				mongoose.connection.close((error) => {
					if (!error) {
						redisInstance.quit(() => {
							done();
						});
					}
				});
			}
		});**/
	});

	it('should return 200 response when token is correct', (done) => {
		done();
	});

	it('should return 401 response when token is not present', (done) => {
		done();
	});

	it('should return 401 response when token is not on redis', (done) => {
		done();
	});

	it('should return 401 response when token information is not on mongodb', (done) => {
		done();
	});

});
