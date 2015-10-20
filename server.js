"use strict";

//Modules
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cors = require('cors');
let colors = require('colors');
let redis = require('redis');

//Own files
let config = require('./config.json');
let utils = require('./utils.js');
let authentication = require('./modules/authentication');
let middleware = require('./middleware');
let logErrors = require('./middleware/logErrors');
let errorHandler = require('./middleware/errorHandler');

//controllers
let authenticationController = require('./controllers/authentication.js');

//Variables
let app = express();
let redisClient = redis.createClient(config.redis.port,config.redis.host);
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
            console.log("Error" + error);
        });
}

let startApp = function(){
    return new Promise((resolve, reject) => {
        instanceApp = app.listen(config.port, function(err){
            if(err){
                reject(err);
            }else{
                resolve(
                    getResponse(instanceApp, "Server is up on port " + config.port)
                );
            }
        })
    })
};

let startMoongose = function(){
    return new Promise((resolve, reject) => {
        instanceMoongose =  mongoose.connect(config.mongodb.host, function(err) {
            if(err){
                reject(err);
            }else{
                resolve(
                    getResponse(instanceMoongose,"MongoDB is up on port " + instanceMoongose.connection.port)
                );
            }
        });
    })
};

let startRedis =  function (){
    return new Promise((resolve, reject) => {
        instanceRedis = redisClient.on("connect", function(err){
            if(err){
                reject(err);
            }else{
                resolve(
                    getResponse(instanceRedis,"Redis is up on port " + config.redis.port)
                );
            }
        });
    })
};


let stop = function(){
    //TODO
};

let stopApp = function(){
    //TODO
};

let stopMongoose = function(){
    //TODO
};

let stopRedis = function(){
    //TODO
};

let getResponse = function(instance,msg){
    return {
        instance:instance,
        msg:msg
    };
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