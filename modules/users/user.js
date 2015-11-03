'use strict';

let User = require("./../../models/user");
let payload = require('./../../modules/jwt/payload');
let UserManager = () => {};

UserManager.parseUserToPayload = function(user){
    return payload.createPayload(
        user._id,
        user.username,
        user.updated_at
    );
};

UserManager.checkUserFromDB = (userAuthHeader) => {
    return new Promise((resolve, reject) => {
        let options = UserManager.makeOptionsWithUserModel(userAuthHeader);

        User.find(options, (err, user) => {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        });
    });
};

UserManager.makeOptionsWithUserModel = (user) => {
    return {
        username: user.username,
        password: user.password
    }
};

module.exports = UserManager;
