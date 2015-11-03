'use strict';

let UserManager = require('./../../modules/users/user');
let jwt = require('./../../modules/jwt/jwt');

module.exports = (() => {
    return (req, res, next) => {
        let oUser = UserManager.checkUserFromDB(req)
            .then((user)=>{
                if(user.length !== 0){
                    req.signin = {user : JSON.stringify(user)};
                    next();
                }else{
                    res.status(200).send('Not found');
                }
            });
    };
})();
