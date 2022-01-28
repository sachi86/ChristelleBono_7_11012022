//Call to dotenv 
const dotenv = require('dotenv');

//Call to function of dotenv config
dotenv.config({ path: './.env' });

const path = require('path');

//Call to sequelize for use
const sequelize = require('./sequelize');

//Call to express for use
const express = require('express');

//Synchronisation des tables
const dbComment = require('./models/Comment.model');
const dbPost = require('./models/Post.model');
const dbPostLike = require('./models/PostLike.model');
const dbUser = require('./models/User.model');


//Call the file to have  defined user routes
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');

//App use the method express
const app = express();

//Allows to manage the authorization
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

sequelize.sync()
app.get("/", (req, res) => {
    res.json({ message: "model syncro!" });
});

//app use to express formated json
app.use(express.json());

//app use to userRoute who defined the routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/profil', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;