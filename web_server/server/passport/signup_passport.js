const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config.json');

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        //////////////////////////////////////////

        //when Passport get email/psw from req body, check user and psw in DB
        const userData = {
            email: email.trim(),
            password: password
        };

        // init a new instance
        const newUser = new User(userData);
        newUser.save(function(err, res){
            console.log('save new user~~~~~~~~~~~~~~~')
            if(err){
                console.log(err);
                return done(err);
            }

            return done(null);
        });

    }
);
