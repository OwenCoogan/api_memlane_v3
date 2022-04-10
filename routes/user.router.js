const express = require('express');
const Controllers = require('../controllers/index');
const upload = require("../middleware/uploadProfilePic");
class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.post("/:id/profile/picture", upload.single("file"), Controllers.userProfile.uploadFiles);
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
