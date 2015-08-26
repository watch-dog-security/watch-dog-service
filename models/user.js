var mongoose = require('mongoose');
//var mongoTypes = require('mongoose-types');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//mongoTypes.loadTypes(mongoose, 'email');

var User = new  Schema({
    username: {
        type: String,
        //validate: [required, 'Username is required'],
        index: { unique: true }
    },
    password: {
        type: String
    },
    /**email: {
        type: mongoose.SchemaTypes.Email,
        validate: [required, 'Email is required'],
        index: { unique: true }
    },**/
    picture:  String,
    salt: 	  String,
    active: {
        type: Boolean,
        'default': false
    },
    createdAt: {
        type: Date,
        'default': Date.now
    }
});

mongoose.model('User', User);