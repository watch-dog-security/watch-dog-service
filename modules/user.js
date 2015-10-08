var User = require("./../models/user");

var UserManager = function() {};

//UserManager.prototype = new

UserManager.prototype.SaveToRedis = function(){
    console.log("save to redis");
};

UserManager.prototype.getPayload = function(){
    return {
        name:this.name,
        username:this.username
    };
};

UserManager.prototype.parseJsonToUserModel = function(req,callback) {
    console.log("Prueba parse");
    var oUserJson = JSON.parse(req);

    this.name = oUserJson.name;
    this.username = oUserJson.username;
    this.password = oUserJson.password;

    callback(error);
};

module.exports = UserManager;
