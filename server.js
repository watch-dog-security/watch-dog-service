//Modules
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

//Own files
var config = require('./config.json');
var utils = require('./utils.js');
var authentication = require('./modules/authentication');
var middleware = require('./middleware');
var logErrors = require('./middleware/logErrors');
var errorHandler = require('./middleware/errorHandler');

//Models
var usersModel = require('./models/user');

//Variables
var app = express();
var router = express.Router();
var exports = module.exports = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logErrors);
app.use(errorHandler);

//Routes
//router.post('/auth/signup', authentication.signUp);
//router.post('/auth/signin', authentication.signIn);
router.get('/',function(req, res){
    res.status(200);
});

app.use(router);

function start(callback){
    var server =  app.listen(app.get('port'), function(err){
        console.log(utils.getInitServerMessage(config));

        startMongoose(function(err,mongoServer){
            if(err!==undefined) {
                console.error("Shutting down watchdog server - Reason: \n\n\t" + err.toString());
                stop(server);
            }
        });

        callback(err,server);
    });
}

function startMongoose(callback){
    var mongoServer = mongoose.connect(config.mongodb.host, function(err) {
        if(err===undefined) {
            console.info("MongoDB is running.");
        }
        callback(err,mongoServer);
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