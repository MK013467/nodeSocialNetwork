const {User, Post} = require("../models");

exports.renderProfile = (req, res) =>{
    res.render("profile", {title: "MY info - NodeBird"});
}

exports.renderJoin = (req, res) => {
    res.render("join", {title: "Sign up- - NodeBird"})
}

exports.renderMain = async(req, res, next) => {
    try{
        const posts = await Post.findAll({
            include:{
                model: User,
                attribute: ["id", "nick"]
            },
            order: [["createdAt" , "DESC"]]
        });
    
    
    res.render("main", {
        title: "NodeBird",
        twits,
    });
    }
    catch(error){
        console.log(error);
        next(error);
    }
};