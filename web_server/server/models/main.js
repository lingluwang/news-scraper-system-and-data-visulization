var mongoose = require('mongoose');

module.exports.connect = (uri)=>{
    mongoose.connect(uri);

  //  var db = mongoose.connection();
    mongoose.connection.on('error', (error)=>{
        console.error(`ERROR!!!! MongoDB Connection Error: ${error}`);
        process.exit(1);
    });

    //load models
    require('./user');
};