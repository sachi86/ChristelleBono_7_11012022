const sequelize = require('../sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const Post = require('./Post.model');
const Comment = require('./Comment.model');
const PostLike = require('./PostLike.model');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    service: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    avatarProfilProfil: {
        type: DataTypes.STRING,
    },
    likes: {
        type: DataTypes.INTEGER,
    }
}, {

});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(PostLike, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
PostLike.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;