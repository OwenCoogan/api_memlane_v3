const express = require('express');
const Controllers = require('../controllers/index');
class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){

    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
