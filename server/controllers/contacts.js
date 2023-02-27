let express = require("express");
let router = express.Router();

let mongoose = require("mongoose");

//create a reference to the db schema which is the model
let Contact = require("../models/contact.js");

module.exports.displayContactsPage =  (req,res,next)=>{
    res.locals = { req: req };

    Contact.find((err, contactList)=>{

        if(err){
            return console.error(err);
        }else{
            res.render('contacts/list',{title:'contacts', ContactList:contactList});
        }
    });
    
};
