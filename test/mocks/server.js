'use strict';

let mockConfig = require('./config/config.js');
let mocks = () => {
};

mocks.fakeServerConfigForRedis =  Object.assign({}, mockConfig.fakeServerConfigForRedis);

module.exports = mocks;
