
const sequelize = require('../sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const Comment = require('./Comment.model');
const PostLike = require('./PostLike.model');


const Post = sequelize.define('Post', {
    post_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaURL: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {

});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Post.hasMany(PostLike, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(PostLike, { foreignKey: 'post_id' });

module.exports = Post;