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
        this.router.post('/check', (req, res) => {
            Controllers.user.checkUser(req,res)
        })
        this.router.post('/update', (req, res) => {
            Controllers.user.updateOne(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
