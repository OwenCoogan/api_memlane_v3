const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/users', (req, res) => {
            Controllers.user.readAll()
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.post('/user/create', (req, res) => {
            Controllers.user.createOne(req)
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( err => res.json( { data: null, err: err } ))
        })
        this.router.post('/login', (req, res) => {
            Controllers.user.login(req)
            .then( apiResponse => res.send( { data: apiResponse, err: null } ))
            .catch( apiError => res.send( { data: null, err: apiError } ))
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
