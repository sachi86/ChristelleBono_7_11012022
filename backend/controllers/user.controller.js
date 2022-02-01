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
        attributes: { exclude: ['password'] },
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// Modify Profil
exports.updateProfil = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user_id = decodedToken.user_id;
/*     if (req.file) { //if a image 
        User.findOne(user_id)// find on user by id 
            .then(profil => {
                const filename = profil.avatarProfil.split('/images/')[1];//return the filename 
                fs.unlink(`images/${filename}`, () => { console.log('File of image is deleted!') });// To delete image 
            })
            .catch(error => res.status(400).json({ error }));//response error bad request
    }

    const profilObject = req.file ?//If in the request have a file
        {
            fistname: JSON.parse(req.body.profil).firstname,
            lastname: JSON.parse(req.body.profil).lastname,
            email: JSON.parse(req.body.profil).email, //trandform a format JSOn to Js object
            service: JSON.parse(req.body.profil).service,
            avatarProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,// to generate a avatarProfil
        } : {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            service: req.body.service
        }; */

    const profilObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        service: req.body.service
    }

    User.update({ user_id: req.params.user_id }, profilObject)// to update the profil with a modification
        .then(res.status(200).json({ message: "Profil is modified!" }))// response resuqest ok
        .catch(error => res.status(400).json({ error }));// response bad request
};

/* exports.updateProfil = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const user_id = decodedToken.user_id;

    req.body.user = user_id


    console.log('bodyUser', req.body.user);
    const profilObject = req.file ?
        {
            ...JSON.parse(req.body.user),
            imageProfile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    User.findOne({
        where: { user_id: user_id },
    })
        .then(userFind => {
            if (userFind) {
                User.update(profilObject, {
                    where: { user_id: user_id }
                })
                    .then(user => res.status(200).json({ message: 'Your profil is update!' }))
                    .catch(error => res.status(400).json({ error }))
            }
            else {
                res.status(404).json({ error });
            }
        })
        .catch(error => res.status(500).json({ error }));
} */

exports.deleteProfil = (req, res, next) => {
    const user_id = req.params.user_id;
    User.findOne({
        attributes: ['user_id'],
        where: { user_id: user_id }
    })
        .then(user => {
            if (user) {
                User.destroy({
                    where: { user_id: user_id }
                })
                    .then(() => res.status(200).json({ message: 'Profil is deleted' }))
                    .catch(() => res.status(500).json({ error }));

            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}