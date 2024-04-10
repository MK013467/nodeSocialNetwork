const passport = require("../passport");
const express = require("express");
const { isLoggedIn , isNotLoggedIn } = require("../middlewares");
const { join , login, logout } =  require("../controllers/auth");

const router = express.Router();

router.post("/join" , isNotLoggedIn, join);
router.post("/login", isNotLoggedIn , login);

// /auth/logout
router.get("/logout" , isLoggedIn, logout );

// /auth/kakao
router.get("/kakao", passport.authenticate("kakao"));

// /auth/kakao/callback
router.get("/kakao/callback" , passport.authenticate("kakao", {
    failureRedirect: "/?error=KakaoLoginFailed",
}), (req,res) => {
    res.redirect("/");
})

module.exports = router; 