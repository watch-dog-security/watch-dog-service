var jwt = require('jwt-simple');
var config = require('./../config.json');

exports.encrypt = function(payload){
    var secret = config.jwt.secret;
    var token = jwt.encode(payload, secret);
    return token;
}





