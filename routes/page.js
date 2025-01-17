const express = require("express");

const{ renderProfile, renderJoin, renderMain} = require("../controllers/page");
const { render } = require("nunjucks");
const { isLoggedIn , isNotLoggedIn} = require("../middlewares")

const router = express.Router();

router.use((req, res, next) =>{
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount  = 0;
    res.locals.followingIdList= [];
    next();
})

router.get("/profile", isLoggedIn, renderProfile);
router.get("/join", isNotLoggedIn, renderJoin);
router.get("/", renderMain);

module.exports = router;