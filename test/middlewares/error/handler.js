'use strict';

let express = require('express');
let assert = require('assert');
let expect = require('chai').expect;
let sinon  = require('sinon');
let httpMocks  = require('node-mocks-http');
let handlerError = require('./../../../middlewares/error/handler');
let appError = require('./../../../modules/error/manager');

describe('Middleware handler error: ', () => {

	it('Should thrown an Error "' + appError('EMAIL_NOT_CORRECT').message + '"', (done) => {
		let app = express();
		let res = httpMocks.createResponse(app);
		let req = httpMocks.createRequest();

		handlerError(appError('EMAIL_NOT_CORRECT'),req, res, () => {});

		assert.equal(res.statusCode, appError('EMAIL_NOT_CORRECT').code);
		done()
	});

	it('Should call next when error is null or entry',(done) => {
		let app = express();
		let res = httpMocks.createResponse(app);
		let req = httpMocks.createRequest();

		let spy = sinon.spy(() => {
			expect(spy.called).to.be.true;
			done();
		});

		handlerError(null, req, res, spy);
	});
});
