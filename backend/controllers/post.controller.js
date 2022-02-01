const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const sequelizeDB = require('../sequelize');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');
const PostLike = require('../models/PostLike.model');
const jwt = require('jsonwebtoken');
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user_id = decodedToken.user_id;
    User.findOne({
        where: { user_id: user_id }
    })
        .then(userAuth => {
            if (userAuth) {
                const post = Post.build({
                    title: req.body.title,
                    mediaURL: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : req.body.mediaURL,
                    user_id: userAuth.user_id
                })
                post.save()
                    .then(() => res.status(201).json({ message: ' post is created' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ error })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

//Middleware to change elements of the post
exports.updatePost = (req, res, next) => {
    if (req.file) { //if a media 
        Post.findById(req.params.post_id)// find one Post by id 
            .then(post => {
                const filename = post.mediaURL.split('/images/')[1];//return the filename 
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

