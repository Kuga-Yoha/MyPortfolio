let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the db schema which is the model
//let Contact = require('../models/contact');

//Contact Controller
let contactController = require('../controllers/contacts');


//helper function for guard purposes
function requireAuth(req,res,next){
    //check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();

}


//GET Router for default
router.get('/',requireAuth, (req,res,next)=>{    
    res.redirect('/contacts/contactList');
});


//GET Router to display the contact list Page
router.get('/contactList',requireAuth,contactController.displayContactsPage );


//POST router to  process the add contact page
router.post('/add',requireAuth,contactController.addContactPage);


//GET Router to display the edit contact Page
router.get('/edit/:id',requireAuth, contactController.displayEditContactPage);

//POST Router to process the edit page changes
router.post('/edit/:id',requireAuth,contactController.processEditContactPage);

router.get('/delete/:id',requireAuth, contactController.deleteContact);

router.get('/*', contactController.otherNonExistentContactPages);
module.exports = router;