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
    const profilObject = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        service: req.body.service,
        email: req.body.email,
    }

    User.update(profilObject, { where: { user_id: user_id } })// to update the profil with a modification
        .then(res.status(200).json({ message: "Profil is modified!" }))// response resuqest ok
        .catch(error => res.status(400).json({ error }));// response bad request
};


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