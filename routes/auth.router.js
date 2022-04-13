const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/users', (req, res) => {
            Controllers.user.readAll(req,res)
        })
        this.router.post('/register', (req, res) => {
            Controllers.user.createOne(req,res)
        })
        this.router.post('/login', (req, res) => {
            Controllers.user.login(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
