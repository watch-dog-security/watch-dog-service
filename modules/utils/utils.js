'use strict';

var exports = module.exports = {};
let colors = require('colors');

/**
 * Show on console a tick with the message passed to the function
 * @param str
 */
exports.consoleLogWithTick = (str)=>{
    console.log(' \u2714 ' + colors.cyan(str));
};

/**
 * Function to put an array with the instance of the service, the name of the service and one message to show when
 * the service start
 * @param nameOfTheService
 * @param instance
 * @param msg
 * @returns {{name: *, instance: *, msg: *}}
 */
exports.getArrayResponseForInstances = (nameOfTheService, instance, msg)=>{
    return {
        name: nameOfTheService,
        instance: instance,
        msg: msg
    };
};
