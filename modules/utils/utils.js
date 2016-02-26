'use strict';

var exports = module.exports = {};
let colors = require('colors');

exports.consoleLogWithTick = (str)=>{
    console.log(' \u2714 ' + colors.cyan(str));
};

exports.getArrayResponseForInstances = (nameOfTheService, instance, msg)=>{
    return {
        name: nameOfTheService,
        instance: instance,
        msg: msg
    };
};