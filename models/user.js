const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    username:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    password:{
        type:DataTypes.STRING,
        validate:{
            len:[8]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    hooks:{
        beforeCreate: async  (newUserData)=>{
            newUserData.password = bcrypt.hashSync(newUserData.password,10);
            return newUserData;
        },

    },
    sequelize
})

module.exports = User