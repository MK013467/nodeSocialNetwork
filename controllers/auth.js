const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

exports.join = async (req, res, next) => {
    const {email, nick , password} = req.body;
    try{
        const exUser = await User.findOne( {where: {email}} );
        if(exUser){
            return res.redirect("/joinerror=exist");
        }
    
    const hash = await bcrypt.hash(password, 15);
    await User.create({
        email,
        nick,
        password: hash,
        });
    }
    catch(error){
        console.error(error);
        return next(error);
    }
}

exports.login = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }

        if(!user){
            return res.redirect("/?error=${info.message}");
        }

        return req.login(user, (loginError) => {
            if(loginError){
                console.error( loginError );
                return next(loginError);
            }

            return res.redirect("/")
        })
    })
}

exports.login = (req, res, next ) => {
    passport.authenticate("local", (authError, user , info ) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }

        if(!user){
            return res.redirect(`/?error=${info.message}`);
        }

        return req.login(user, (loginError) =>{
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        })
        
    }, (req, res, next));
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};