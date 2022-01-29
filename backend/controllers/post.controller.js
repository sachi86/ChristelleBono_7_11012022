const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const sequelizeDB = require('../sequelize');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
const PostLike = require('../models/PostLike.model');
const fs = require('fs');

exports.listAllPost = (req, res, next) => {
    Post.findAll({
        include: [
            {
                model: Comment,
            },
            {
                model: User,
                attributes: ['user_id', 'firstname', 'avatarProfil']
            }],
        order: [['createdAt', 'DESC']]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: {
            post_id: req.params.post_id
        },
        include: [{
            model: User,
            attributes: ['user_id', 'firstname', 'avatarProfil']
        }]
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    console.log("hello baby");
    const postObject = JSON.parse(req.body.post);//transform a format JSON to a JS object
    const post = new Post({// create a new post models
        user_id: postObject.user_id,
        title: postObject.title,
        media: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`, //Allows to generate Url media
        likes: 0,
    });
    console.log(post);
    post.save()
        .then(() => res.status(201).json({ message: 'post is created!' }))// response to create data
        .catch(error => res.status(400).json({ error }));// response error bad request
};

//Middleware to change elements of the post
exports.updatePost = (req, res, next) => {
    if (req.file) { //if a media 
        Post.findById(req.params.post_id)// find one Post by id 
            .then(post => {
                const filename = post.imageUrl.split('/images/')[1];//return the filename 
                fs.unlink(`images/posts/${filename}`, () => { console.log('File of image is deleted!') });// To delete media
            })
            .catch(error => res.status(400).json({ error }));//response error bad request
    }

    const postObject = req.file ?//If in the request have a file
        {
            title: JSON.parse(req.body.post).title, //trandform a format Json to Js object
            mediaUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,// to generate a url media
        } : {
            title: req.body.title,
        };

    Post.updateOne({ post_id: req.params._id }, postObject)// to update the post with a modification
        .then(res.status(200).json({ message: "Post is update!" }))// response resuqest ok
        .catch(error => res.status(400).json({ error }));// response bad request
};

exports.deletePost = (req, res, next) => {
    Post.findbyId({//find one post
        where: { post_id: req.params.post_id }
            .then(post => {
                const filename = post.mediaUrl.split('/images/')[1];// to return the filename
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({ post_id: req.params.post_id }) // delete post
                        .then(res.status(200).json({ message: "Post deleted!" }))// response request ok
                        .catch(error => res.status(400).json({ error }));// response error bad request
                });
            })
            .catch(() => res.status(500).json({ error }))
    })
};

/* //Middleware to manage the like
exports.postLike = (req, res, next) => {
    Post.findOne({
        where: { _id: req.params.postId },
        includes: [{
            model: PostLike,
        }]
    })
        .then(postLike => {
            const liked = req.body.like;
            
        }
    }; */