
var bodyParser = require('body-parser');
var config = require('./config/config.json');
var cors = require('cors');
var express = require('express');
var path = require('path');
var passport = require('passport');

var index = require('./routes/index');
var news = require('./routes/news');
var auth = require('./routes/auth');

var app = express();

require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build'));
//app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

//TODO: remove this after dev is done
// app.all('*', function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-with");
//   next();
// });


// local passport strategy
app.use(passport.initialize());
var localLoginStrategy = require('./passport/login_passport');
var localSignupStrategy = require('./passport/signup_passport');
passport.use('local-login', localLoginStrategy);
passport.use('local-signup', localSignupStrategy);

app.use(cors());

// all request convert into json
app.use(bodyParser.json());

app.use('/', index);
app.use('/auth', auth);

var authorizationCheck = require('./middleware/auth_checker');
app.use('/news', authorizationCheck); // before getting news, call auth_checker middle ware

app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.send('404 not found');
});

module.exports = app;
