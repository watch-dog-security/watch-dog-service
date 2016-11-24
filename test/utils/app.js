'use strict';

const bodyParser = require('body-parser');
const express = require('express');

let fakeApp;

/**
 * Set dependencies on array to set it on express fake APP
 * @param app
 * @param dependencies
 */
let setDependenciesToExpressServer = (app, dependencies) => {

};

/**
 * Set modules on array to set it on express fake APP
 * @param app
 * @param modules
 */
let setModulesToExpressServer = (app, modules) => {

};

/**
 * Start fake server to test middlewares with dependencies
 * @param modules
 * @param dependencies
 */
exports.start = (modules, dependencies) => {
	fakeApp = express();
	this.setDependenciesToExpressServer(fakeApp, dependencies);
	this.setModulesToExpressServer(fakeApp, modules);

};

exports.stop = () => {

};

