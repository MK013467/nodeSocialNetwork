const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {afterUploadImage , uploadPost} = require("../Controllers/post");
const {isLoggedIn} = require("../middlewares");

const router = express.Router();

if(!fs.existsSync("../uploads")) {
    fs.mkdirSync("../uploads")
}


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file ,cb){
            cb(null , "uploads/");
        },
    filename(req, file , cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext ) +Date.now() + ext);
    }
    },
    
    ),
    // Max size = 10Mb
    limits: {fileSize: 10*(1024**2)}
})

// Post /post /img
router.post("/img", isLoggedIn, upload.single("img"), uploadPost);

//Post /post
const upload2 = multer()
router.post("/" , isLoggedIn,upload2.none(), uploadPost);


module.exports = router;