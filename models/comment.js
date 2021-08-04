const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    description:{
        type:DataTypes.TEXT
    }
},{sequelize})

module.exports = Comment