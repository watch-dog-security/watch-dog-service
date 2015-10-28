'use strict';

let mongoose = require('mongoose');
let service = require('./../services');
let User = require('./../models/user');
let UserManager = require('./../modules/user');
let jwt = require('./../modules/jwt');

exports.signup = (() => {
    return (req, res, next) => {

        let oUser = UserManager.parseJsonToUserModel(req);

        oUser.save((err)=>{
            if (err) {
                res.status(500).send('Something is going wrong');
            }else{
                res.status(200).send('User saved successfully!');
                next();
            }
        });
    };
})();

exports.signin = (() => {
    return (req, res, next) => {
        let oUser = UserManager.parseJsonAndCheckUserFromDB(req)
            .then((user)=>{
                if(user.length !== 0){
                    res.status(200).send('User from db' + user + ';');
                    next();
                }else{
                    res.status(200).send('Not found');
                }
            });
    };
})();