'use strict';

let User = require('./../../models/user');
let payload = require('./../../modules/jwt/payload');
let UserManager = () => {};

UserManager.parseUserToPayload = function(user){
    let _user = JSON.parse(user)[0];
    return payload.createPayload(
        _user._id,
        _user.username
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
    };
};

module.exports = UserManager;
