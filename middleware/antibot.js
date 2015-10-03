var config = require('../config.js');
var redis = require('redis');
var redisClient = redis.createClient(config.redis.host,config.redis.port);

function antibot(req, res, next){

}

function findAttemps(){

}

module.exports = antibot;