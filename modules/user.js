var User = require("./../models/user");

exports.parseJsonToUserModel = function(req,callback) {

    var jsonObject = JSON.parse(req);
    var error = undefined;

    var user = new User({
        name: jsonObject.name,
        username: jsonObject.username,
        password: jsonObject.password
    });

    callback(user,error);
};
