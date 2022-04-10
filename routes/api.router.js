const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/wtf/', (req, res) => {
            Controllers.fun.RickAndMortyApi(req,res)
            .then( apiResponse => res.json( { data: apiResponse.data.results, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })

        this.router.get('/posts/', (req, res) => {
            Controllers.post.readAll(req, res)
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.get('/posts/:id', ( req,res) => {
            Controllers.post.readOne(req)
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })
        this.router.post('/post/create', (req, res) => {
            Controllers.post.createOne(req)
            .then(req => console.log(req))
            .then( apiResponse => res.json( { data: apiResponse, err: null }))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })

        this.router.get('/post/:id/comments', (req, res) => {
            Controllers.comment.readAll(req)
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })

        this.router.post('/post/:id/comment/add', (req, res) => {
            Controllers.comment.createOne(req)
            .then( apiResponse => res.json( { data: apiResponse, err: null } ))
            .catch( apiError => res.json( { data: null, err: apiError } ))
        })

        this.router.post('/post/:id/comment/:id/delete', (req, res) => {
            Controllers.comment.delete(req)
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
