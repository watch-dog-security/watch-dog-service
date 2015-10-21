"use strict";

//Modules
let config = require('./../config.json');

//Variables
let appInstance;

let loadServerEvents = function(instance){
    appInstance = instance;

    appInstance.on('close', function() {
        console.log('Stopping ' + config.name);
    });

    return appInstance;
};

module.exports = {
    loadServerEvents : loadServerEvents
};
