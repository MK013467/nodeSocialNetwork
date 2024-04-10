const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
    passport.serializeUser( (user, done ) => {
        done(none, user.id);
    });
    
    passport.deserializeUser( (user ,done ) => {
        User.findOne( {where: {id}})
        .then(user => done (null, user))
        .catch( err => done(err));
    });


    local();
    kakao();
};