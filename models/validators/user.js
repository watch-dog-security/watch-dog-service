'use strict';

let UserValidator = () => {};
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const countryCodeRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

UserValidator.validateEmail = function (email) {
    return emailRegex.test(email);
};

UserValidator.validateCountryCode = function (countryCode) {
    return countryCodeRegex.test(countryCode);
};

module.exports = UserValidator;