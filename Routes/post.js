const express = require('express');
const router = express.Router();
const authMiddelware = require('../Helpers/authMiddelware');
const Post = require('../models/PostSchema')

//Add New Post
router.post("/", authMiddelware, (req,res)=>{
    let newPost = new Post({...req.body, owner: req.userId})
        newPost
        .save()
        .then(post => res.status(201).send(post))
        .catch((err) => {
                console.log(err.message);
                res.status(500).send({ msg: "Server Error" });
            });
} );

//Get All Post
router.get('/', authMiddelware, (req,res)=>{
    Post.find()
        .then(posts=> res.send(posts))
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ msg: "Server Error" });
        });
});

//Get User Posts
router.get('/myPosts', authMiddelware, (req,res)=>{
    User.find({owner: req.userId})
        .then(posts=> res.send(posts))
        .catch((err) => {
        console.log(err.message);
        res.status(500).send({ msg: "Server Error" });
        });
})



module.exports = router;