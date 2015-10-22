'use strict';

//Modules
let express = require('express');
let mongoose = require('mongoose');
let redis = require('redis');
let bodyParser = require('body-parser');
let cors = require('cors');
let colors = require('colors');

//Own files
const config = require('./config.js');
let utils = require('./utils.js');
let serverEvents = require('./events/server.js');
let authentication = require('./modules/authentication');
let middleware = require('./middleware');
let logErrors = require('./middleware/logErrors');
let errorHandler = require('./middleware/errorHandler');

//controllers
let authenticationController = require('./controllers/authentication.js');

//Variables
let app = express();
let instanceApp = undefined;
let instanceMoongose = undefined;
let instanceRedis = undefined;


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logErrors);
app.use(errorHandler);

//Routers
app.use('/auth',authenticationController);

function start(){
    Promise.all([
        startApp(),
        startMoongose(),
        startRedis()
    ])
        .then(function(data){
            data.forEach(function(response){
                utils.consoleLogWithTick(response.msg);
            })
        })
        .catch(function (error){
            console.log('Error' + error);
        });
}

let startApp = function(){
    return new Promise((resolve, reject) => {
        instanceApp = app.listen(config.app.port, function(err){
            if(err){
                reject(err);
            }else{
                instanceApp = serverEvents.loadServerEvents(instanceApp);
                resolve(
                    utils.getArrayResponseForInstances(instanceApp, 'Server is up on port ' + instanceApp.address().port)
                );
            }
        })
    })
};


let startMoongose = function(){
    return new Promise((resolve, reject) => {
        instanceMoongose =  mongoose.connect(config.database.mongodb.host, function(err) {
            if(err){
                reject(err);
            }else{
                resolve(
                    utils.getArrayResponseForInstances(instanceMoongose,'MongoDB is up on port ' + instanceMoongose.connection.port)
                );
            }
        });
    })
};

let startRedis =  function (){
    return new Promise((resolve, reject) => {
        instanceRedis = redis.createClient(config.database.redis.port,config.database.redis.host);
        instanceRedis.on('connect', function(err){
            if(err){
                reject(err);
            }else{
                resolve(
                    utils.getArrayResponseForInstances(instanceRedis,'Redis is up on port ' + instanceRedis.connectionOption.port)
                );
            }
        });
    })
};


let stop = function(){
    Promise.all([
        stopApp(),
        stopMongoose(),
        stopRedis()
    ])
        .then(function(data){
            data.forEach(function(msg){
                utils.consoleLogWithTick(msg);
            })
        })
        .catch(function (error){
            console.log('Error' + error);
        });
};

let stopApp = function(){
    return new Promise((resolve, reject) => {
        instanceApp.close(function(error){
            let msg;
            if(error){
                msg = error.toString();
                reject(msg)
            }else{
                msg = 'APP instance is correctly stoped.';
                resolve(msg);
            }
        });
    })
};

let stopMongoose = function(){
    return new Promise((resolve, reject) => {
        instanceMoongose.disconnect(function(error){
            let msg;
            if(error){
                msg = error.toString();
                reject(msg)
            }else{
                msg = 'MongoDB instance is correctly stoped.';
                resolve(msg);
            }
        });
    })
};

let stopRedis = function(){
    return new Promise((resolve, reject) => {
        instanceRedis.disconnect(function(error){
            let msg;
            if(error){
                msg = error.toString();
                reject(msg)
            }else{
                msg = 'Redis instance is correctly stoped.';
                resolve(msg);
            }
        });
    })
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