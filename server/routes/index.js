var express = require('express');
var router = express.Router();


let indexController = require("../controllers/index");
let contactsController = require("../controllers/contacts");

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

//Get Error"Message
router.get('/error', indexController.displayErrorPage);

// router.get("", function (req, res, next) {
//   res.render("error", { title: "Error", message: "404" });
// });

router.get('/contacts', contactsController.displayContactsPage);


module.exports = router;
