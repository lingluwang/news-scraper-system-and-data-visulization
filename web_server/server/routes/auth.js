var express = require('express');
var router = express.Router();
var passport = require('passport');
var validator = require('validator');


router.post('/login', (req, res, next)=>{
    ///////////////////////////////////////
    console.log('login http request from client~~~~~~~~~~~~~');
    console.log(req);

    const validateResult = validateLoginForm(req.body);
    //////////////////////////////////////////
    console.log('form validation result: ' + validateResult.success);

    if (!validateResult.success) {
        return res.status(400).json({
            success: false,
            message: validateResult.message,
            errors: validateResult.errors
        });
    }

    return passport.authenticate('local-login', (err, token, userData)=>{
        /////////////////////////////////////
        console.log('login auth~~~~~~~~~~~');
        console.log(err);
        console.log(token);
        console.log(userData);
        if (err) {
            if(err.name ==='IncorrectCredentialsError'){
                return res.status(400).json({
                    success:false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form:' + err.message
            });
        }

        return res.json({
            success: true,
            message: 'Success Login!',
            token,
            user: userData
        });
    })(req, res, next);
    
});

router.post('/signup', (req, res, next)=>{
    const validateResult = validateLoginForm(req.body);

    if (!validateResult.success) {
        return res.status(400).json({
            success: false,
            message: validateResult.message,
            errors: validateResult.errors
        });
    }

    return passport.authenticate('local-signup', (err)=>{
        /////////////////////////////////////
        console.log('receive something~~~~~~~~~~~~~ from singup auth');

        if (err) {
            //////////////////////////////////////
            console.log('auth, singup err: !!!!' + err);

            //11000 is Mongo code for a plication email error
            // the 409 status is for conflict err
            if(err.name ==='MongoError' && err.code === 11000){
                return res.status(409).json({
                    success:false,
                    message: 'Check the form for errors.',
                    errors: {
                        email: 'This email is already taken'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form:' + err.message
            });
        }
        //////////////////////////////////////
        console.log('would return the res to signup client~~~~~~~~~~~~~');
        return res.json({
            success: true,
            message: 'You have successfully signed up! Now you are able to login',
        });
    })(req, res, next);
});

function validateLoginForm(payload) {
    console.log(payload);
    const errors={};
    var isFormValid = true;
    var message = ''; 

    if(!payload || typeof payload.email !== 'string' || payload.email.trim().length===0){
        isFormValid = false;
        errors.email='Please provide your email address.';
    }

    if(!payload || typeof payload.password !== 'string' || payload.password.length===0){
        isFormValid = false;
        errors.password='Please provide your password.';
    }

    if (!isFormValid){
        message = 'Please check the form for errors';
    }
    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateSignupForm(payload) {
    console.log(payload);
    const errors={};
    var isFormValid = true;
    var message = ''; 

    if(!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)){
        isFormValid = false;
        errors.email='Please provide a correct email address.';
    }

    if(!payload || typeof payload.password !== 'string' || payload.password.length < 8){
        isFormValid = false;
        errors.password='Password must have at least 8 characters.';
    }

    if (!isFormValid){
        message = 'Please check the form for errors';
    }
    return {
        success: isFormValid,
        message,
        errors
    };
}

module.exports = router;