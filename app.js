'use strict';

let server = require('./server');
const utils = require('./modules/utils/utils.js');

server.start().then((responses) => {
    responses.forEach((response) => {
        utils.consoleLogWithTick(response.msg);
    })
});
