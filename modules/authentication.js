var mongoose = require('mongoose');
var User = require("./../models/user");
var service = require('./../services');
var userModule = ('./../modulesuser');

exports.signUp = function(req, res, err) {

    var objUser = new User();

    userModule.parseJsonToUserModel(req,function(user,error){
        if(error){
            err = error;
        }else{
            objUser = user;
        }
    });

    objUser.save(function(err){
        if (err) {
            console.error(err);
            return res.status(500).send('Something is going wrong');
        }else{
            console.log('User saved successfully!');
            return res.status(200);
        }
    });
};

exports.signIn = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};