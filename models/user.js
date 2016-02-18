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
    codeCountry: {
        type: String,
        required: true
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

module.exports = mongoose.model('User', UserSchema);