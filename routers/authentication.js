'use strict';

let router = require('express').Router();
let signup = require('./../middlewares/authentication/signup');
let signin = require('./../middlewares/authentication/signin');
let giver = require('./../middlewares/jwt/giver');
let errorHandler = require('./../middlewares/error/handler');
let empty = require('./../middlewares/helper/emptyBody');

router.post('/signup', empty, signup, errorHandler);
router.post('/signin', signin, giver, errorHandler);

module.exports = router;
