let express = require("express");
let router = express.Router();


//GET Router to display the edit contact Page
router.get("/edit/:id", (req,res,next)=>{
    res.locals = { req: req };
    res.render('contacts/edit',{title:"Kugavathanan | Add Contact", action:"edit"});
});





router.get("/", (req,res,next)=>{    
    res.render("home",{"title":"Contact"});
});

module.exports = router;