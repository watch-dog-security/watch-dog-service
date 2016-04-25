'use strict';

let router = require('express').Router();
let tokenChecker = require('./../middlewares/jwt/tokenChecker');
let gateway = require('./../middlewares/gateway/gway');
let errorHandler = require('./../middlewares/error/handler');

router.post('/gateway', tokenChecker, gateway, errorHandler);

module.exports = router;
