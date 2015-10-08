var mongoose = require('mongoose');
var User = require("./../models/user");
var service = require('./../services');
var UserTest = require('./../modules/user');
var jwt = ('jwt');

exports.signUp = function(req, res, err) {

    var oUser = new UserTest();
    oUser.SaveToRedis();

    oUser.parseJsonToUserModel(req,function(error){
        if(error){
            err = error;
        }
    });

    var encriptado = jwt.encrypt(User.getPayload());

    console.log("jwt:" + encriptado);

    User.save(function(err){
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

