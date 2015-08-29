var exports = module.exports = {};

exports.getInitServerMessage = function(config){
    var message = '';
    message += config.name + ' is running on port ' + config.port;
    return message;
};
