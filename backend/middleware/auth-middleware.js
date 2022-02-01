//Call the module of jsonwebtoken for token management
const jwt = require('jsonwebtoken');

//Call to dotenv 
const dotenv = require('dotenv');

//Call to function of dotenv config
dotenv.config({ path: './.env' });


//Allows authentication verification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);//To décode the token with key
    const user_id = decodedToken.user_id;//Get the user id in the decode token 
    if (req.body.user_id && req.body.user_id !== user_id) {
      throw 'Invalid user ID';
    } else {              //Check that the user id of the token is the same as that of the request
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')// response error unauthorized 
    });
  }
};