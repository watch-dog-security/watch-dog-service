'use strict';

//Modules
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

//Own files
const config = require('./config/server/config.js');
const utils = require('./modules/utils/utils.js');
const serverEvents = require('./events/server.js');

//Routers
const authenticationRouter = require('./routers/authentication');
const gatewayRouter = require('./routers/gway');

//Variables
let app = express();
let instanceApp = undefined;
let instanceMoongose = undefined;
let instanceRedis = undefined;

//Security
app.disable('x-powered-by');

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

//Routers
app.use('/auth',authenticationRouter);
app.use(gatewayRouter);

let start = () =>{
    Promise.all([
        startApp(),
        startMoongose(),
        startRedis()
    ])
        .then((data)=>{
            data.forEach((response)=>{
                utils.consoleLogWithTick(response.msg);
            });
        })
        .catch((error)=>{
            console.log('Error' + error);
        });
};

let startApp = () => {
    return new Promise((resolve, reject) => {
        app.listen(config.app.port, (err)=>{
            if(err){
                reject(err);
            }else{
                instanceApp = serverEvents.loadServerEvents(instanceApp);
                resolve(
                    utils.getArrayResponseForInstances(instanceApp, 'Server is up on port ' + instanceApp.address().port)
                );
            }
        });
    });
};


let startMoongose = () => {
    return new Promise((resolve, reject) => {
        instanceMoongose =  mongoose.connect(config.database.mongodb.host, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve(
                    utils.getArrayResponseForInstances(instanceMoongose,'MongoDB is up on port ' + instanceMoongose.connection.port)
                );
            }
        });
    });
};

let startRedis = () => {
    return new Promise((resolve, reject) => {
        instanceRedis = redis.createClient(config.database.redis.port,config.database.redis.host);
        instanceRedis.on('connect', (err)=>{
            if(err){
                reject(err);
            }else{
                resolve(
                    utils.getArrayResponseForInstances(instanceRedis,'Redis is up on port ' + instanceRedis.connectionOption.port)
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
        .then((data)=>{
            data.forEach(function(msg){
                utils.consoleLogWithTick(msg);
            });
        })
        .catch((error)=>{
            console.log('Error' + error);
        });
};

let stopApp = () => {
    return new Promise((resolve, reject) => {
        instanceApp.close((error) => {
            let msg;
            if(error){
                msg = error.toString();
                reject(msg);
            }else{
                msg = 'APP instance is correctly stoped.';
                resolve(msg);
            }
        });
    });
};

let stopMongoose = () => {
    return new Promise((resolve, reject) => {
        instanceMoongose.disconnect((error) =>{
            let msg;
            if(error){
                msg = error.toString();
                reject(msg);
            }else{
                msg = 'MongoDB instance is correctly stoped.';
                resolve(msg);
            }
        });
    });
};

let stopRedis = () => {
    return new Promise((resolve, reject) => {
        instanceRedis.disconnect((error) => {
            let msg;
            if(error){
                msg = error.toString();
                reject(msg);
            }else{
                msg = 'Redis instance is correctly stoped.';
                resolve(msg);
            }
        });
    });
};

module.exports = {
    start : start,
    stop : stop,
    startApp: startApp,
    stopApp: stopApp,
    startRedis: startRedis,
    stopRedis: stopRedis,
    startMoongose: startMoongose,
    stopMongoose: stopMongoose
};