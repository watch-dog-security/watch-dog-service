'use strict';

let appInstance;

let loadServerEvents = function(instance){
    appInstance = instance;

    appInstance.on('close', closeAppEvent);

    return appInstance;
};

let closeAppEvent = function(){};

module.exports = {
    loadServerEvents : loadServerEvents
};
