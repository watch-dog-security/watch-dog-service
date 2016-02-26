'use strict';

//Modules
const config = require('./../config/server/config.js');

//Variables
let appInstance;

let loadServerEvents = function(instance){
    appInstance = instance;

    appInstance.on('close', closeAppEvent);

    return appInstance;
};

let closeAppEvent = function(){
    //console.log('Stopping ' + config.app.name);
};

module.exports = {
    loadServerEvents : loadServerEvents
};
