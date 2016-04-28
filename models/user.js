'use strict';

const i18n = require('i18n');

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserValidator = require('./validators/user');

i18n.configure({
	locales:['en', 'es'],
	directory: __dirname + '/../config/locales'
});

let UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: UserValidator.validateEmail,
            message: i18n.__('Email syntax is not correct')
        }
    },
    codeCountry: {
        type: String,
        required: true,
        validate: {
            validator: UserValidator.validateCountryCode,
            message: i18n.__('Country code is not correct')
        }
    },
    mobilePhone: {
        type: Number,
        required: true,
        unique: true
    },
    admin: Boolean,
    location: String,
    meta: {
        birthdate: {
            type: Date,
            required: true
        },
        age: Number,
        website: String
    },
    created_at: {
		type: Date,
		default: Date.now
	},
    updated_at: Date
});

UserSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('User', UserSchema);
