var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//1. connecting to DB. 
// we move DB connecting to main.js, 
// because if with multiple models, we conly need connect DB once within main.js.
// and in main.js, load each model

// 2. Define a model
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {require: true}
    },
    password: String
});

// 3. custmozed method -- need callback
userSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
}

//4. mongoose middleware. encode the password before save it
userSchema.pre('save', function saveHook(next){
    const user = this;
    //proceed further only if the password is modified or the user is new
    if(!user.isModified('password')){
        return next();
    }
    bcrypt.genSalt((saltError, salt)=>{ //create salt, and within the genSalt use the salt
        if(saltError) {
            return next(saltError);
        } else {
            return bcrypt.hash(user.password, salt, (hashError, hash)=>{
                if(hashError){
                    return next(hashError);
                } else {
                    user.password = hash;
                    return next();
                }
            });
        }
    });
});

module.exports = mongoose.model('User', userSchema);
