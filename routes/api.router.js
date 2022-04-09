const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/posts/', (req, res) => {
            Controllers.post.readAll()
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.post('/post/create', (req, res) => {
            Controllers.post.createOne(req)
            .then(req => console.log(req))
            .then( apiResponse => res.json( { data: apiResponse, err: null }))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.get('/posts/', ( res) => {
            Controllers.post.readAll()
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.get('/posts/:id', ( req,res) => {
            Controllers.post.readOne(req)
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
