'use strict';

let mongoose = require('mongoose');
let User = require('./../../models/user');
let UserManager = require('./../../modules/users/user');

module.exports = (() => {
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