let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;
let mongoose = require('mongoose');

module.exports.displayHomePage = (req, res, next) => {
    res.locals = { req: req };
    res.render("home", { title: "Kugavathanan",displayName:req.user? req.user.displayName:'' });
};

module.exports.displayAboutMePage = function (req, res, next) {
    res.locals = { req: req };
    res.render('about_me', { title: "Kugavathanan | About Me", displayName:req.user? req.user.displayName:'' });
};

module.exports.displayProjectsPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('projects', { title: "Kugavathanan | Projects", displayName:req.user? req.user.displayName:'' });
};

module.exports.displayServicesPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('services', { title: "Kugavathanan | Services", displayName:req.user? req.user.displayName:'' });
};

module.exports.displayContactsPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('contact', { title: "Kugavathanan | Contact Me",displayName:req.user? req.user.displayName:'', action: "add" });
};


module.exports.displayErrorPage = (req, res, next) => {
    res.locals = { req: req };
    res.render("error", { title: "Error", message: "404" });
};

module.exports.displayLoginPage = (req, res, next) => {
    res.locals = { req: req };

    //check if the user is already logged in
    if (!req?.user) {
        //console.log("<<<<<<<<<<<");
        res.render('auth/login', {
            title: "Kugavathanan | Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '',
        });
    } else {
        res.redirect('/');
    }

};

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //server error
        if (err) {
            return next(err);
        }
        //is there user login error
        if (!user) {
            req.flash('loginMessage',
                'Authenticate Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => {
            //server error ?
            if (err) {
                return next(err);
            }
            return res.redirect('/contacts/contactList');
            //return res.render('contacts/list',{title: "Kugavathanan | Contact List", displayName: user.displayName});
        });
    })(req, res, next);

};


module.exports.performLogout = (req,res,next)=>{
    req.logout(function(err){
      if(err){
        return next(err);
        
      }else{
        res.redirect('/');
      }
    });
    
  };


  module.exports.displayRegisterPage = (req,res,next)=>{
    //check if the user is not already logged in
    if(!req.user){
      res.render('auth/register',
      {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user? req.user.displayName: ''
  
      });
    }else{
      return res.redirect('/');   
    }
  }
  
  module.exports.processRegisterPage = (req,res,next) =>{
    //instantiate a user object
    console.log("////////////////");
    let newUser = User({
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    });
  console.log("------------------------", newUser);
    User.register(newUser, req.body.password, (err)=>{
      if(err)
      {
        console.log("error:inserting New User");
        if(err.name == "UserExists Error"){
          req.flash('registerMessage',
          'Registration Error: user Already Exits!');
          console.log("Error: user Already Exists");
        }
        res.render('auth/register',{
        messages:req.flash('registerMessage'),
        displayName: req.user?req.user.displayName:''
       });
      }
      else{
        //if no error exists, then registration is successful
        //redirect the user and authenticate them
         passport.authenticate('local')(req,res,()=>{
          res.redirect('/contacts/contactList');
        });
      }
    })
  }
  
  
  
  
  