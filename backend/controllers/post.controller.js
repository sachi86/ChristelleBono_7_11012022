const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
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
                attributes: ['user_id', 'firstname', 'lastname', 'avatarProfil']
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
            attributes: ['user_id', 'firstname', 'lastname', 'avatarProfil']
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
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user_id = decodedToken.user_id;

    Post.findOne({
        where: {
            post_id: req.params.post_id
        },
        include: [{
            model: User,
            attributes: ['user_id']
        }]
    })
        .then(post => {

            if (user_id === post.user_id) {

                const postObject = {
                    title: req.body.title,
                }
                Post.update(postObject, { where: { post_id: req.params.post_id } })// to update the post with a modification
                // .then(res.status(200).json({ message: "Post is update!" }))// response resuqest ok
                // .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        })

};

exports.deletePost = (req, res, next) => {
    Post.findOne({//find one post
        where: { post_id: req.params.post_id }
    })
        .then(post => {
            const filename = post.mediaURL.split('/images/posts')[1];// to return the filename
            fs.unlink(`images/${filename}`, () => {
                Post.destroy(
                    { where: { post_id: req.params.post_id } }) // delete post
                    .then(res.status(200).json({ message: "Post deleted!" }))// response request ok
                    .catch(error => res.status(400).json({ error }));// response error bad request
            });
        })
        .catch(() => res.status(500).json({ error }))

};

