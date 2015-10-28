'use strict';

let router = require('express').Router();
let signup = require('../middlewares/authentication/signup');
let signin = require('../middlewares/authentication/signin');
let giver = require('../middlewares/jwt/giver');

router.post('/signup', signup);
router.post('/signin', signin, giver);

module.exports = router;