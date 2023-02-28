module.exports.displayHomePage =  (req, res, next) => {
    res.locals = { req: req };
    res.render("home", { title: "Kugavathanan" });
} ;

module.exports.displayAboutMePage =function (req, res, next) {
    res.locals = { req: req };
    res.render('about_me', { title: "Kugavathanan | About Me" });
};

module.exports.displayProjectsPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('projects', { title: "Kugavathanan | Projects" });
};

module.exports.displayServicesPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('services', { title: "Kugavathanan | Services" });
};

module.exports.displayContactsPage = function (req, res, next) {
    res.locals = { req: req };
    res.render('contact', { title: "Kugavathanan | Contact Me", action:"add" });
} ;


module.exports.displayErrorPage = (req, res, next) => {
    res.render("error", { title: "Error", message: "404" });
};