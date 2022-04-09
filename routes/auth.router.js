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
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
