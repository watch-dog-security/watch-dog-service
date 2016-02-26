'use strict';

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/server/config.js');
const utils = require('./modules/utils/utils.js');
const serverEvents = require('./events/server.js');
const authenticationRouter = require('./routers/authentication');
const gatewayRouter = require('./routers/gway');
const i18n = require("i18n");

let app = express();
let instanceApp = undefined;
let instanceMoongose = undefined;
let instanceRedis = undefined;

i18n.configure({
    defaultLocale: 'en',
    directory: './locales',
    register: global
});

app.disable('x-powered-by');

app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authenticationRouter);
app.use(gatewayRouter);

let start = () => {
    Promise.all([
            startApp(),
            startMoongose(),
            startRedis()
        ])
        .then((data)=> {
            data.forEach((response)=> {
                utils.consoleLogWithTick(response.msg);
            });
        })
        .catch((error)=> {
            console.log('Error' + error);
        });
};

let startApp = () => {
    return new Promise((resolve, reject) => {
        instanceApp = app.listen(config.app.port, (err)=> {
            if (err) {
                reject(err);
            } else {
                instanceApp = serverEvents.loadServerEvents(instanceApp);
                resolve(
                    utils.getArrayResponseForInstances(instanceApp, __('Server is up on port ') + instanceApp.address().port)
                );
            }
        });
    });
};


let startMoongose = () => {
    return new Promise((resolve, reject) => {
        instanceMoongose = mongoose.connect(config.database.mongodb.host, (err)=> {
            if (err) {
                reject(err);
            } else {
                resolve(
                    utils.getArrayResponseForInstances(instanceMoongose, __('MongoDB is up on port ') + instanceMoongose.connection.port)
                );
            }
        });
    });
};

let startRedis = () => {
    return new Promise((resolve, reject) => {
        instanceRedis = redis.createClient(config.database.redis.port, config.database.redis.host);
        instanceRedis.on('connect', (err)=> {
            if (err) {
                reject(err);
            } else {
                resolve(
                    utils.getArrayResponseForInstances(instanceRedis, __('Redis is up on port ') + instanceRedis.connectionOption.port)
                );
            }
        });
    });
};


let stop = () => {
    Promise.all([
            stopApp(),
            stopMongoose(),
            stopRedis()
        ])
        .then((data)=> {
            data.forEach(function (msg) {
                utils.consoleLogWithTick(msg);
            });
        })
        .catch((error)=> {
            console.log('Error' + error);
        });
};

let stopApp = () => {
    return new Promise((resolve, reject) => {
        instanceApp = instanceApp.close((error) => {
            let msg;
            if (error) {
                msg = error.toString();
                reject(msg);
            } else {
                msg = __('APP instance is correctly stoped');
                resolve(msg);
            }
        });
    });
};

let stopMongoose = () => {
    return new Promise((resolve, reject) => {
        instanceMoongose = instanceMoongose.connection.close((error) => {
            let msg;
            if (error) {
                msg = error.toString();
                reject(msg);
            } else {
                msg = __('MongoDB instance is correctly stoped');
                resolve(msg);
            }
        });
    });
};

let stopRedis = () => {
    return new Promise((resolve, reject) => {
        instanceRedis = instanceRedis.quit((error) => {
            let msg;
            if (error) {
                msg = error.toString();
                reject(msg);
            } else {
                msg = __('Redis instance is correctly stoped');
                resolve(msg);
            }
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
    startMoongose: startMoongose,
    stopMongoose: stopMongoose
};