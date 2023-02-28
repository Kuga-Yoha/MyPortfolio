let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
require("dotenv").config();
//Database Setup
let mongoose = require('mongoose');
let DB = require('./db');

//modules for authentication
let session = require('express-session');        
let passport = require('passport');
let passportLocal = require('passport-local');
let localStratergy = passportLocal.Strategy;
let flash = require('connect-flash');


//Enable live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 5);
});

//Point mongoose to DB URI
mongoose.connect(DB.URI, {useNewUrlParser:true,useUnifiedtopology:true });
let mongoDB = mongoose.connection;

//Event Listener for Mongo DB
mongoDB.on('error', console.error.bind(console,'Connection Error:'));
mongoDB.once('open',()=>{
  console.log("connected to MongoDB");
});


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contacts');


let indexController = require('../controllers/index');
let app = express();
app.use(connectLivereload());


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, "../../node_modules")));


//setup express session
app.use(session({
  secret:"someSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash - to maintain error message
app.use(flash());

//intialize passport
app.use(passport.initialize());
app.use(passport.session());
//passport configuration

//create a user model instance
let userModel = require('../models/user');
let User = userModel.User;
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
//app.use('/*', express.Router().get('/*', indexController.displayErrorPage));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;