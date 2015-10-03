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

function start(callback){

    var server =  app.listen(config.port, function(err){

        console.log("\n> " + config.name);

        utils.consoleLogWithTick("It is running on port " + config.port);

        startMongoose(function(err,mongoServer){
            if(err!==undefined) {
                stop(server);
                console.error("Shutting down watchdog server - Reason: \n\n\t" + err.toString());
            }
        });

        startRedis(function(redisError,redisClient){
            if(redisError!==undefined) {
                stop(server);
                console.error("Shutting down watchdog server - Reason: \n\n\t" + err.toString());
            }else{
                callback(err,server);
            }
        });

    });
}

function startMongoose(callback){
    var mongoServer = mongoose.connect(config.mongodb.host, function(err) {
        if(err===undefined) {
            utils.consoleLogWithTick("MongoDB is running on port " + config.mongodb.port);
        }
        callback(err,mongoServer);
    });
}

function startRedis(callback){
    var redisClientVar = redisClient.on("connect", function(err){
        utils.consoleLogWithTick("Redis is running on port " + config.redis.port);
        callback(err,redisClientVar);
    });
}

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
    startMongoose: startMongoose,
    stopMongoose: stopMongoose
};