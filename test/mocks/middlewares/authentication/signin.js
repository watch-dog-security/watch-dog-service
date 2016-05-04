'use strict';

let mocks = () => {};
let mocksUserModule = require('./../../modules/users/user');

mocks.validUserToMongoose = mocksUserModule.userJson;
mocks.validAuthenticationHeader = 'Basic YWxiZXJ0b2lnOjEyMzQ==';
mocks.invalidFormatedAuthenticationHeader = 'Basic cHJ1ZWJhOg==';
mocks.invalidAuthenticationHeader = 'Basic YWxiZXJ0b2l nOkVuam95V0RT==';
mocks.notExistAuthenticationHeader = 'Basic WWxiZ342b2tnOkVuam95V0RT==';

module.exports = mocks;
