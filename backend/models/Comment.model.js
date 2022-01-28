const sequelize = require('../sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Comment = sequelize.define('Comment', {
    comment_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true
    },
    post_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {

});

module.exports = Comment;