'use strict';

let mongoose = require('mongoose');
let User = require('./../../models/user');
let UserManager = require('./../../modules/users/user');
let jwt = require('./../../modules/jwt/jwt');

module.exports = (() => {
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
