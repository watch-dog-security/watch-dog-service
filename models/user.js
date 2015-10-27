'use strict';

let mongoose = require('mongoose');
let crypto = require('crypto');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('User', UserSchema);;