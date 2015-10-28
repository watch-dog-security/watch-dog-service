'use strict';

// Requires
let jwt = require('../../modules/jwt/jwt');

// Headers
const typeHeader = 'token_type';
const tokenHeader = 'access_token';

// Others
const correctType = 'Bearer';

module.exports = () => {
    return (req, res, next) => {
        let type = req.headers[typeHeader];
        let token = req.headers[tokenHeader];

        if(type !== undefined && token !== undefined){
            if(type === correctType){
                next();
            }else{
                res.status(400);
                res.send('You must to add the correct type, incorrect call.');
            }
        }else{
            res.status(400);
            res.send('You must to add the headers, incorrect call.');
        }
    }
};
