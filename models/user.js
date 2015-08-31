var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var User = new  Schema({
    name: String,
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

mongoose.model('User', User);
User = mongoose.model('User');
module.exports =  User;