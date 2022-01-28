const sequelize = require('../sequelize');
const { Sequelize, DataTypes } = require('sequelize');


const PostLike = sequelize.define('PostLike', {
    like_id: {
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
    }
}, {
    tableName: 'postslikes',
    timestamps: false
});

module.exports = PostLike;