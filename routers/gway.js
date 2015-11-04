'use strict';

let router = require('express').Router();
let tokenChecker = require('../middlewares/jwt/tokenChecker');
let gateway = require('../middlewares/gateway/gway');

router.post('/gateway', tokenChecker, gateway);

module.exports = router;