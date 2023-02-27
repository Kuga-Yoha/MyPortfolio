let mongoose = require("mongoose");

let contactModel = mongoose.Schema({
"firstName":String,
"lastName": String,
"contactNumber":String,
"email":String,
"message": String,
"created":Date,
"lastUpdated":Date
},{
    collection:"contacts"
});


module.exports = mongoose.model('contact', contactModel);
