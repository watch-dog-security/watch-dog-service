'use strict';

let User = require("./../../models/user");
let UserManager = function() {};

UserManager.getPayload = function(user){
    return {
        name:user.name,
        username:user.username
    };
};

UserManager.parseJsonToUserModel = (req) => {

    let oUserJson = JSON.parse(
        JSON.stringify(req.body)
    );

    return new User({
        name: oUserJson.name,
        username: oUserJson.username,
        password: oUserJson.password
    });

};

UserManager.parseJsonAndCheckUserFromDB = (req) => {
    return new Promise((resolve, reject) => {
        let oUserJson = JSON.parse(
            JSON.stringify(req.body)
        );

        User.find({ username: oUserJson.username }, (err, user) => {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        });
    });
};

module.exports = UserManager;
