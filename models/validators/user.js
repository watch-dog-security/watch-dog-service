'use strict';

let UserValidator = () => {};
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let countryCodeRegex = /^(\+)(\d\-\d{1,3}|\d{1,3})$/;

UserValidator.validateEmail = function (email) {
    return emailRegex.test(email);
};

UserValidator.validateCountryCode = function (countryCode) {
    return countryCodeRegex.test(countryCode);
};

module.exports = UserValidator;