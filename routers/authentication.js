'use strict';

let express = require('express');
let router = express.Router();
let signup = require('./signup');
let signin = require('./signin');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;