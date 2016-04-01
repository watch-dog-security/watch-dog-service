'use strict';

let mocks = () => {};

mocks.validEmail = 'alberto.uchiha@gmail.com';
mocks.emailWithoutAt = 'alberto.uchihagmail.com';
mocks.emailWithoutDomain = 'alberto.uchiha@gmail';
mocks.emailWithoutName = '@gmail.com';
mocks.emailWithoutCompleteDomain = 'alberto.uchiha@';
mocks.emailUndefined = undefined;

mocks.validCountryCode = '+34';
mocks.validCountryCodeTwo = '+3-54';
mocks.countryCodeWithoutPlus = '34';
mocks.countryCodeWithoutNumbers = '+';
mocks.countryCodeWithLetters = '+lrf';
mocks.countryCodeUndefined = undefined;

module.exports = mocks;
