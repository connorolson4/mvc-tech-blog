const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    description:{
        type:DataTypes.TEXT
    }
},{sequelize})

module.exports = Post