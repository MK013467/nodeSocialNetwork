const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

module.exports = () => {
    passport.use(new localStrategy(
    {
        usernameField: "email",
        passportField: "password",
        passReqToCallback: false,
    },
    async (email, password, done) => {
        try{
            const exUser = await User.findOne({where: {email}});
    
        if (exUser){
            const result = await bcrypt.compare(password, exUser.password);
            if(result){
                done(null, exUser);
            }
            else{
                done(null, false, {message: "password does not match"});
            }
        }
        else{
            done(null, false, {message: "User is not registered"});
        }
        
        }
        catch(error){
            console.error(error);
            done(error);
        }
    }
    )
    )
}