const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const Comment = require('../models/Comment.model');
const User = require('../models/User.model');


exports.listAllComment = (req, res, next) => {
    Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { user_id: req.params.user_id },
        include: [{
            model: User,
            attributes: ['avatarProfil', 'firstname', 'user_id']
        }]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);//transform a format JSON to a JS object
    const comment = new Comment({// create a new comment models
        user_id: commentObject.user_id,
        post_id: commentObject.post_id,
        message: commentObject.message,
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'post is created!' }))// response to create data
        .catch(error => res.status(400).json({ error }));// response error bad request
};

exports.updateComment = (req, res, next) => {
    const comment = new Comment({
        comment_id: req.params.comment_id,
        user_id: req.body.user_id,
        post_id: req.body.post_id,
        message: req.body.message,
    });
    Comment.updateOne({ comment_id: req.params.comment_id }, comment)
        .then(() => res.status(200).json({ message: 'Comment is update!' }))
        .catch((error) => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            comment_id: req.params.comment_id
        }
    })
        .then(() => res.status(200).json({ message: 'Comment is deleted !' }))
        .catch((error) => res.status(500).json({ error }));
};
