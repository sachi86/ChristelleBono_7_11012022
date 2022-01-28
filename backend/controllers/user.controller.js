//Call the module of jsonwebtoken for token management
const jwt = require('jsonwebtoken');

//Call to dotenv 
const dotenv = require('dotenv');

//Call to function of dotenv config
dotenv.config({ path: '../.env' });

//Call the file to have the user Schema
const User = require('../models/User.model');

const fs = require('fs');

// Get one profil
exports.getOneProfil = (req, res, next) => {
    User.findOne({
        where: { user_id: req.params.user_id },
        attributes: { exclude: ['email', 'password'] },
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// Modify Profil
exports.updateProfil = (req, res, next) => {
    if (req.file) { //if a image 
        User.findById(req.params.id)// find on user by id 
            .then(profil => {
                const filename = profil.imageUrl.split('/images/')[1];//return the filename 
                fs.unlink(`images/${filename}`, () => { console.log('File of image is deleted!') });// To delete image 
            })
            .catch(error => res.status(400).json({ error }));//response error bad request
    }

    const profilObject = req.file ?//If in the request have a file
        {
            email: JSON.parse(req.body.profil).email, //trandform a format JSOn to Js object
            service: JSON.parse(req.body.profil).service,
            avatarProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,// to generate a avatarProfil
        } : {
            email: req.body.email,
            service: req.body.service
        };

    User.updateOne({ _id: req.params.id }, profilObject)// to update the profil with a modification
        .then(res.status(200).json({ message: "Profil is modified!" }))// response resuqest ok
        .catch(error => res.status(400).json({ error }));// response bad request
};

