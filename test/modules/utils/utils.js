'use strict';

let assert = require('assert');
let utils = require('./../../../modules/utils/utils.js');
let sinon = require('sinon');
let chai = require('chai');
let expect = chai.expect;

describe('Utils module', () => {
	describe('Check Function getArrayResponseForInstances', () => {
		it('should return the correct instance and msg',(done) => {
			var instance = {
				name: 'service test',
				instance: 'instancia',
				msg: 'mensaje de la instancia'
			};
			var returnedInstance = utils.getArrayResponseForInstances(instance.name, instance.instance, instance.msg);

			assert.equal(instance.name, returnedInstance.name);
			assert.equal(instance.instance, returnedInstance.instance);
			assert.equal(instance.msg, returnedInstance.msg);
			done();
		});
	});

	describe('Check Function consoleLogWithTick', () => {
		beforeEach(function() {
			sinon.spy(console, 'log');
		});

		afterEach(function() {
			console.log.restore();
		});

		it('should log to console with the tick',(done) => {
			var msg = 'hola mundo';

			utils.consoleLogWithTick(msg);
			expect(console.log).to.be.called;
			done();
		});
	});
});
