const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

// check if every load more news request bringing the workable token
module.exports = (req, res, next) => {
    console.log('auth_checker~~~~~~~~~~~~');
    console.log(req.headers);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
   // console.log(res);
    //console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    // if there is no headers in reqeust, then return response status as 401(unauthenticated)
    // and not continue the next.
    if (!req.headers.authorization) {
        console.log('~~~~~~~~ no authorization info '+ req.headers.authorization);
        return res.status(401).end(); 
    }

    // get token
    const token = req.headers.authorization.split(' ')[1];
    console.log('auth-checker: token~~~: ' + token);

    // decode the token to get the user_id in DB
    // decode token to get the payload and then get the sub in payload
    return jwt.verify(token, config.jwtSecret, (err, decoded)=>{
        if(err){
            return res.status(401).end();
        }

        const user_id = decoded.sub;

        // check if a user exists
        return User.findById(user_id, (userErr, user)=>{
            if(userErr || !user) {
                return res.status(401).end();
            }
            
            return next();
        });
    });
};