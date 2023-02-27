let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the db schema which is the model
let Contact = require('../models/contact');

//
let contactController = require('../controllers/contacts');

//GET Router for default
router.get('/', (req,res,next)=>{    
    res.redirect('/contacts/contactList');
});


//GET Router to display the contact list Page
router.get('/contactList', contactController.displayContactsPage );


//POST router to  process the add contact page
router.post('/add',contactController.addContactPage);


//GET Router to display the edit contact Page
router.get('/edit/:id', contactController.displayEditContactPage);

//POST Router to process the edit page changes
router.post('/edit/:id',contactController.processEditContactPage);

router.get('/*', contactController.otherNonExistentContactPages);
module.exports = router;