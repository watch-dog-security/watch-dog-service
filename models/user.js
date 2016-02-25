'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserValidator = require('./validators/user');

let UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    userName: {
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
            message: 'Email syntax is not correct.'
        }
    },
    codeCountry: {
        type: String,
        required: true,
        validate: {
            validator: UserValidator.validateCountryCode,
            message: 'Country code is not correct.'
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
    created_at: Date,
    updated_at: Date
});

UserSchema.pre('save', function (next) {
    let now = new Date();
    this.updated_at = now;

    if (!this.created_at) {
        this.created_at = now;
    }

    next();
});

module.exports = mongoose.model('User', UserSchema);