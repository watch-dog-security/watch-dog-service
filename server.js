"use strict";

//Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var colors = require('colors');
var redis = require('redis');

//Own files
var config = require('./config.json');
var utils = require('./utils.js');
var authentication = require('./modules/authentication');
var middleware = require('./middleware');
var logErrors = require('./middleware/logErrors');
var errorHandler = require('./middleware/errorHandler');

//controllers
var authenticationController = require('./controllers/authentication.js');

//Variables
var app = express();
var redisClient = redis.createClient(config.redis.port,config.redis.host);

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
            data.forEach(function(txt){
                utils.consoleLogWithTick(txt);
            })
        })
        .catch(function (error){
            console.log("Error" + error);
        });
}

let startApp = function(){
    return new Promise((resolve, reject) => {
        app.listen(config.port, function(err){
            if(err){
                reject(err);
            }else{
                resolve("Server is up on port " + config.port);
            }
        })
    })
}

let startMoongose = function(){
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongodb.host, function(err) {
            if(err){
                reject(err);
            }else{
                resolve("MongoDB is up on port " + config.mongodb.port);
            }
        });
    })
};

let startRedis =  function (){
    return new Promise((resolve, reject) => {
        redisClient.on("connect", function(err){
            if(err){
                reject(err);
            }else{
                resolve("Redis is up on port " + config.redis.port);
            }
        });
    })
};



function stopMongoose(instance){
    isntance.connection.close();
}

function stop(instance,callback){
    instance.close(function(err){
        callback(err)
    });
}

module.exports = {
    start : start,
    stop : stop,
    startApp: startApp,
    startRedis: startRedis,
    startMoongose: startMoongose,
    stopMongoose: stopMongoose
};