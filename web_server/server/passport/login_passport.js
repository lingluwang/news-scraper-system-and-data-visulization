const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config.json');

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },
    function(req, email, password, done) {
        //////////////////////////////////////////


        //when Passport get email/psw from req body, check user and psw in DB
        const userData = {
            email: email.trim(),
            password: password
        };

        // find the user
        return User.findOne({'email': userData.email}, (err, user)=>{
            if(err){
                return done(err);
            }
            // user does not exist
            if(!user){
                const error = new Error("Incorrect User email or Password");
                error.name = "IncorrectCredentialsError";
                return done(error);
            }

            //if user exist then compare the password
            return user.comparePassword(userData.password, (passwordErr, isMatch)=>{
                if(passwordErr){
                    return done(passwordErr);
                }
                if (!isMatch){
                    const error = new Error("Incorrect User email or Password");
                    error.name = "IncorrectCredentialsError";
                    return done(error);
                }

                //return token by jwt
                const payload = {
                    sub: user._id
                };

                //create a token string
                // const token = jwt.sign(payload, config.jwtSecret, {
                //     expiresIn: '14d'
                // });
                const token = jwt.sign(payload, config.jwtSecret);
                ////////////////////////////
                console.log("login strategy created token~~~~~~" + token );

                const data = {
                    name: user.email
                }
                //return 
                return done(null, token, data); 
            });
        });
    }
);
