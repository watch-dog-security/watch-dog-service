'use strict';

let express = require('express');
let authentication = require('../modules/authentication');
let router = express.Router();
let signup = authentication.signup;
let signin = authentication.signin;

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;