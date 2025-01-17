const {Post, Hashtag} = require("../models");

exports.afterUploadImage = (req, res) =>{
    res.json({url: `/img/${req.file.filename}`});
}

exports.uploadPost = async(req, res , next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id
        });
        //if there is hashtags
        const hashtags = req.body.content.match(/#[^\s#]*/g);

        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: {title: tag.slice(1).toLowerCase()}
                    })
                }),
                )
            await post.addHashtags(result.map(r => r[0]));

            }
        res.redirect("/")
        }
    
    catch(error){
        console.error;
        next(error);
    }
}