"use strict";

var exports = module.exports = {};
let colors = require('colors');

exports.consoleLogWithTick = function(str){
    console.log(" \u2714 " + colors.cyan(str));
};

exports.getArrayResponseForInstances = function(instance,msg){
    return {
        instance:instance,
        msg:msg
    };
};