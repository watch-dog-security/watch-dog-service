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

UserManager.parseJsonToUserModel = (req) => {
    let oUserJson = UserManager.parseJSON(req.body);

    return new User({
        name: oUserJson.name,
        username: oUserJson.username,
        password: oUserJson.password
    });
};

UserManager.checkUserFromDB = (req) => {
    return new Promise((resolve, reject) => {
        let user = UserManager.parseJsonToUserModel(req);
        let options = UserManager.makeOptionsWithUserModel(user);

        User.find(options, (err, user) => {
            if(err){
                reject(err);
            }else{
                resolve(user);
            }
        });
    });
};

UserManager.parseJSON = (json) => {
    return JSON.parse(
        JSON.stringify(json)
    );
};

UserManager.makeOptionsWithUserModel = (user) => {
    return {
        username: user.username,
        password: user.password
    }
};

module.exports = UserManager;
