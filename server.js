require("babel-core").transform("code", options);

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
        startApp,
        startRedis,
        startMoongose
    ])
        .catch((error) => {
            console.log("Error" + error);
        });
}

let startApp  = function(){
    return new Promise((resolve, reject) => {
        app.listen(config.port, function(err){
            if(err){
                reject(err);
            }else{
                utils.consoleLogWithTick("Server is up on port " + config.port);
                resolve();
            }
        })
    })
};

let startMoongose = function(){
    return new Promise((resolve, reject) => {
        mongoose.connect(config.mongodb.host, function(err) {
            if(err){
                reject(err);
            }else{
                utils.consoleLogWithTick("MongoDB is up on port " + config.mongodb.port);
                resolve();
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
                utils.consoleLogWithTick("Redis is up on port " + config.redis.port);
                resolve();
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
    startMoongose: startMoongose,
    stopMongoose: stopMongoose
};