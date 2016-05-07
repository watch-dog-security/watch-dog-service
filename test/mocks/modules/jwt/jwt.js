'use strict';

let mocks = () => {};
let mockConfig = require('./../../config/config.js');
let mockPayload = require('./payload.js');

mocks.signatureVerification = {};

mocks.configurationOfThePayload = Object.assign({}, mockPayload.configurationOfThePayload);

mocks.configurationOfThePayloadTokenNotActive = Object.assign({}, mockPayload.configurationOfThePayloadTokenNotActive);

mocks.configurationOfThePayloadTokenExpired = Object.assign({}, mockPayload.configurationOfThePayloadTokenExpired);

mocks.configurationWithoutKey = Object.assign({}, mockConfig.configurationWithoutKey);

mocks.configurationWithoutAlgorithm = Object.assign({}, mockConfig.configurationWithoutAlgorithm);

mocks.tokenSignedWithOtherPassword = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

module.exports = mocks;
