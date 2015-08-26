var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var authCtrl = require('./auth');
var middleware = require('./middleware');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

require('./models/user');

var router = express.Router();
router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);
//router.get('/private',middleware.ensureAuthenticated, function(req, res) {...} );

mongoose.connect('mongodb://localhost', function(err) {
    app.listen(app.get('port'), function(){
        console.log('Express corriendo en http://localhost:3000');
    });
});