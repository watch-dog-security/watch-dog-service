"use strict";
var exports = module.exports = {};
var colors = require('colors');

exports.consoleLogWithTick = function(str){
    console.log(" \u2714 " + colors.cyan(str));
}