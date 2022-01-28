
//Call the  express for use
const express = require('express');

//Call the method router
const router = express.Router();

//Call the fils to have logic of user's routes
const authCtrl = require('../controllers/auth.controller');


//Defined route signup with the methode post 
router.post('/signup', authCtrl.signup);

//Defined route login with the methode post 
router.post('/login', authCtrl.login);

//Export the methode router
module.exports = router;