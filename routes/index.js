var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: '' });
});

/*GET About*/
router.get('/about-me', function(req, res, next) {
  res.render('about_me', { title: 'About Me' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});
router.get('/contact-me', function(req, res, next) {
  res.render('contact_me', { title: 'Contact Me' });
});


module.exports = router;
