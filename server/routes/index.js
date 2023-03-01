var express = require('express');
var router = express.Router();


let indexController = require("../controllers/index");
let contactsController = require("../controllers/contacts");


//helper function for guard purposes
function requireAuth(req,res,next){
    //check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();

}

// GET home page. 
router.get("/", indexController.displayHomePage);

//GET about-me page 
router.get('/about-me',indexController.displayAboutMePage );

//GET projects page
router.get('/projects', indexController.displayProjectsPage );

//GET services page 
router.get('/services', indexController.displayServicesPage);

//GET contact-me page
router.get('/contact', indexController.displayContactsPage);

//Get Error Message
router.get('/error', indexController.displayErrorPage);

// router.get("", function (req, res, next) {
//   res.render("error", { title: "Error", message: "404" });
// });

//GET contacts
router.get('/contacts',requireAuth, contactsController.displayContactsPage);

//GET login page
router.get('/login', indexController.displayLoginPage);

//POST login process
router.post('/login', indexController.processLoginPage);

//GET to perform user Logout
router.get('/logout', indexController.performLogout);

/*
//GET Register for 
router.get('/register', indexController.displayRegisterPage);

//POST Router for processing registration
router.post('/register', indexController.processRegisterPage);
*/

module.exports = router;
