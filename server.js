'use strict';

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/server/config.js');
const utils = require('./modules/utils/utils.js');
const authenticationRouter = require('./routers/authentication');
const gatewayRouter = require('./routers/gway');
const i18n = require("i18n");
const bunyan = require('bunyan');
const path = require('path');
const log = bunyan.createLogger({
	name: config.app.name,
	streams: [
		{
			level: 'info',
			stream: process.stdout
		},
		{
			level: 'warn',
			path: path.join(__dirname + '/logs/') + config.app.name.replace(/\s/g, '') + '-warn.log'
		},
		{
			level: 'error',
			path: path.join(__dirname + '/logs/') + config.app.name.replace(/\s/g, '') + '-error.log'
		}
	]
});

let app = express();
let instanceApp;
let instanceMoongose;
let instanceRedis;

i18n.configure({
	defaultLocale: 'en',
	directory: './config/locales',
	register: global
});

app.disable('x-powered-by');

app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authenticationRouter);
app.use(gatewayRouter);

let startApp = () => {
	//TODO: check how to close properly connection task
	return new Promise((resolve) => {
		instanceApp = app.listen(config.app.port, () => {
			resolve(
				utils.getArrayResponseForInstances('APP', instanceApp, __('Server is up on port ') + instanceApp.address().port)
			);
		})
	});
};

let startMongoose = () => {
	return new Promise((resolve, reject) => {
		instanceMoongose = mongoose.connect(config.database.mongodb.host, (err)=> {
			if (err) {
				reject(err);
			} else {
				resolve(
					utils.getArrayResponseForInstances('Mongoose', instanceMoongose, __('MongoDB is up on port ') + instanceMoongose.connection.port)
				);
			}
		});
	});
};

let startRedis = () => {
	return new Promise((resolve, reject) => {
		instanceRedis = redis.createClient(config.database.redis.port, config.database.redis.host);

		instanceRedis.on("error", function (err) {
			return reject(err);
		}).on('connect', () => {
			app.set('redisInstance', instanceRedis);
			return resolve(
				utils.getArrayResponseForInstances('Redis', instanceRedis, __('Redis is up on port ') + instanceRedis.connection_options.port)
			);
		});
	});
};

let start = () => {
	return new Promise((resolve, reject) => {
		Promise.all([
				startApp(),
				startMongoose(),
				startRedis()
			])
			.then((data)=> {
				resolve(data);
			})
			.catch((error)=> {
				reject(error);
			});
	});
};

let stopApp = () => {
	return new Promise((resolve) => {
		instanceApp.close(() => {
			const msg = __('APP instance is correctly stoped');
			instanceApp = undefined;
			resolve(
				utils.getArrayResponseForInstances('APP', instanceApp, msg)
			);
		});
	});
};

let stopMongoose = () => {
	return new Promise((resolve) => {
		instanceMoongose.connection.close(() => {
			let msg = __('MongoDB instance is correctly stoped');
			instanceMoongose = undefined;
			resolve(
				utils.getArrayResponseForInstances('Mongoose', instanceMoongose, msg)
			);
		});
	});
};

let stopRedis = () => {
	return new Promise((resolve) => {
		instanceRedis.quit(() => {
			let msg = __('Redis instance is correctly stoped');
			instanceRedis = undefined;
			return resolve(
				utils.getArrayResponseForInstances('Redis', instanceRedis, msg)
			);
		});
	});
};

let stop = () => {
	return new Promise((resolve, reject) => {
		Promise.all([
				stopApp(),
				stopMongoose(),
				stopRedis()
			])
			.then((data)=> {
				resolve(data);
			})
			.catch((error)=> {
				reject(error);
			});
	});
};

module.exports = {
	start: start,
	stop: stop,
	startApp: startApp,
	stopApp: stopApp,
	startRedis: startRedis,
	stopRedis: stopRedis,
	startMongoose: startMongoose,
	stopMongoose: stopMongoose
};
