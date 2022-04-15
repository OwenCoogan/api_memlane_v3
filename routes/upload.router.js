const express = require('express');
const Controllers = require('../controllers/index');
const upload = require("../middleware/upload.middleware");

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.post("/post/:id/image/add", upload.single("file"), Controllers.post.AddPicture);

        this.router.post("/user/:id/profile/picture", upload.single("file"), Controllers.userProfile.uploadProfilePicture);
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
