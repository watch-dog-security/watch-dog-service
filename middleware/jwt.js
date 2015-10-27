'use strict';

let typeHeader = 'token_type';
let tokenHeader = 'access_token';

module.exports = () => {
    return (req, res, next) => {
        let type = req.headers[typeHeader];
        let token = req.headers[tokenHeader];

        if(type !== undefined && token !== undefined){
            next();
        }else{
            res.status(400);
            res.send("No headers!");
        }
    }
};
