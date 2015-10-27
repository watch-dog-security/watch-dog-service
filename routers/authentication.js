"use strict";

let express = require('express');
let authentication = require('../modules/authentication');
let router = express.Router();

router.post('/signup', function(req, res) {
    authentication.signUp(req,res);
    res.send('signup');
});

router.post('/signin', function(req, res) {
    authentication.signIn();
    res.send('signin')
});

module.exports = router;