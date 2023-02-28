let express = require("express");
// let router = express.Router();

// let mongoose = require("mongoose");

//create a reference to the db schema which is the model
let Contact = require("../models/contact.js");

//Display contacts page
module.exports.displayContactsPage =  (req,res,next)=>{
    res.locals = { req: req };

    Contact.find({},null,{sort:{firstName:1}},(err, contactList)=>{

        if(err){
            return console.error(err);
        }else{
            res.render('contacts/list',{title:'contacts',displayName:req.user? req.user.displayName:'', ContactList:contactList});
        }
    });
    
};

//process add contacts page
module.exports.addContactPage = (req,res,next)=>{
    res.locals = { req: req };

    let newContact = Contact({
    "firstName":req.body.firstName,
    "lastName": req.body.lastName ,
    "contactNumber": req.body.contactNumber,
    "email": req.body.email,
    "message": req.body.message,
    "created": Date.now(),
    "lastUpdated": Date.now()
    }) 


    Contact.create(newContact, (err)=>{
        if(err){      
            res.end(err); 
        
            // res.redirect('/error');
        }else{
            res.redirect('/');
        }
    });

};

// display edit-contacts page
module.exports.displayEditContactPage = (req,res,next)=>{
    res.locals = { req: req };
    let id = req.params.id;
    Contact.findById(id,(err, contact)=>{
        if(err){
             console.error(err);
             //res.end(err); 
             res.redirect('/error');
        }else{
            res.render('contacts/edit',{title:"Kugavathanan | Edit Contact",displayName:req.user? req.user.displayName:'', Contact:contact, action:"edit"});
        }
    });

};

//process edit contacts page
module.exports.processEditContactPage = (req,res,next)=>{
    res.locals = { req: req };
    
    let contact ={
        "firstName":req.body.firstName,
        "lastName": req.body.lastName ,
        "contactNumber": req.body.contactNumber,
        "email": req.body.email,
        "message": req.body.message,
        //"created": Date(),
        "lastUpdated": Date()
    } 
    
    Contact.updateOne({_id:req.params.id},{$set:contact},(err, contact)=>{
        if(err){
             console.error(err);
             //res.end(err); 
             res.redirect('/error');
        }else{
            res.redirect("/contacts/edit/"+req.params.id);
        }
    });

};

module.exports.deleteContact = (req,res,next)=>{
    res.locals = { req: req };

    Contact.deleteOne({_id:req.params.id}, (err)=>{
        if(err){
            res.redirect('/error');
        }else{
            res.redirect('/contacts/contactList');
        }
    });
}


module.exports.otherNonExistentContactPages =(req, res, next) => {
      res.redirect('/error');
    }
