var express = require('express');
var router = express.Router();

// GET home page. 
// GET index page 
router.get("/", function (req, res, next) {
  res.locals = { req: req };
  res.render("home", { title: "Kugavathanan" });
});

//GET about-me page 
router.get('/about-me', function(req, res, next) {
  res.locals = { req: req };
  res.render('about_me', { title: "Kugavathanan | About Me" });
});

//GET projects page
router.get('/projects', function(req, res, next) {
  res.locals = { req: req };
  res.render('projects', { title: "Kugavathanan | Projects" });
});

//GET services page 
router.get('/services', function(req, res, next) {
  res.locals = { req: req };
  res.render('services', { title: "Kugavathanan | Services" });
});

//GET contact-me page
router.get('/contact', function(req, res, next) {
  res.locals = { req: req };
  res.render('contact', { title: "Kugavathanan | Contact Me" });
});


module.exports = router;
