'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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
        unique: true
    },
    codeCountryForMobilePhone: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /+d{3}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    mobilePhoneNumber: {
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

module.exports = mongoose.model('User', UserSchema);