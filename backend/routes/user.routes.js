
//Call the  express for use
const express = require('express');

//Call the method router
const router = express.Router();

//Call the fils to have logic of user's routes
const userCtrl = require('../controllers/user.controller');

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth-middleware');


//Defined route get one account with the method get
router.get('/profil/:user_id', auth, userCtrl.getOneProfil);

router.put('/profil/:user_id', auth, multer, userCtrl.updateProfil);

//Export the methode router
module.exports = router;