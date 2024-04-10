exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/"); 
    }
}

exports.isNotLoggedIn = (req, res, next ) => {
    if (!req.isAuthenticated()){
        next();
    }
    else {
        const message = encodeURIComponent("Already loggedin");
        res.redirect("/?error=${message}");
    }

    
}