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

// Credentials for login username: admin password:admin
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




  }
  
*/
  
  
  