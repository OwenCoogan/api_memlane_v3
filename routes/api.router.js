const express = require('express');
const Controllers = require('../controllers/index');
class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/wtf/', (req, res) => {
            Controllers.fun.RickAndMortyApi(req,res)
        })
        this.router.get('/posts/', (req, res) => {
            Controllers.post.readAll(req, res)
        })
        this.router.get('/posts/:id', ( req,res) => {
            Controllers.post.readOne(req,res)
        })
        this.router.post('/post/create', (req, res) => {
            Controllers.post.createOne(req,res)
        })
        this.router.post('/post/:id/update', (req, res) => {
            Controllers.post.updateOne(req,res)
        })
        this.router.post('/post/:id/delete', (req, res) => {
            Controllers.post.deleteOne(req,res)
        })
        this.router.post('/post/:id/comment/add', (req, res) => {
            Controllers.comment.createOne(req,res)
        })
        this.router.post('/post/comment/:commentId/update', (req, res) => {
            Controllers.comment.updateOne(req,res)
        })
        this.router.post('/post/:id/comment/:id/delete', (req, res) => {
            Controllers.comment.deleteOne(req,res)
        })
        this.router.get('/user/:id/', (req, res) => {
            Controllers.userProfile.getUserProfile(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
