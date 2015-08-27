var express = require('express');
var config = require('./config.json');
var utils = require('./utils.js');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var authCtrl = require('./auth');
var middleware = require('./middleware');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', config.port);

require('./models/user');

var router = express.Router();
router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);
//router.get('/private',middleware.ensureAuthenticated, function(req, res) {...} );

mongoose.connect(config.mongodb.host, function(err) {
    app.listen(app.get('port'), function(){
        console.log(
            utils.getInitServerMessage(config)
        );
    });
});