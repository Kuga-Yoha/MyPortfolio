let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a reference to the db schema which is the model
let Contact = require("../models/contact");


//POST router to  process the add contact page
router.post("/add",(req,res,next)=>{
let newContact = Contact({
    "firstName":req.body.firstName,
    "lastName": req.body.lastName ,
    "contactNumber": req.body.contactNumber,
    "email": req.body.email,
    "message": req.body.message,
    "created": Date(),
    "lastUpdated": Date()
}) 


Contact.create(newContact, (err)=>{
    if(err){      
        res.end(err);
    }else{
        res.redirect('/contacts/contactList');
    }
});

});


//GET Router to display the edit contact Page
router.get("/edit/:id", (req,res,next)=>{
    res.locals = { req: req };
    let id = req.params.id;
    Contact.findById(id,(err, contact)=>{
        if(err){
             console.error(err);
             res.end(err);
        }else{
            res.render('contacts/edit',{title:"Kugavathanan | Edit Contact", Contact:contact, action:"edit"});
        }
    });

});

//POST Router to process the edit page changes
router.post("/edit/:id", (req,res,next)=>{
    res.locals = { req: req };
    
    let contact = Contact({
        "_id":req.params.id,
        "firstName":req.body.firstName,
        "lastName": req.body.lastName ,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email,
        "message": req.body.message,
        //"created": Date(),
        "lastUpdated": Date()
    }) 
    
    Contact.updateOne(contact,(err, contact)=>{
        if(err){
             console.error(err);
             res.end(err);
        }else{
            res.redirect("/contacts/edit/"+req.params.id);
        }
    });

});



//(req,res,next)=>{}

//GET Router to display the contact list Page
router.get("/contactList", (req,res,next)=>{
    res.locals = { req: req };

    Contact.find((err, contactList)=>{

        if(err){
            return console.error(err);
        }else{
            res.render('contacts/list',{title:'contacts', ContactList:contactList});
        }
    });
    
});



router.get("/", (req,res,next)=>{    
    res.redirect("/contacts/contactList");
});

module.exports = router;