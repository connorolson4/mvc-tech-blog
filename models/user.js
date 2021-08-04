const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = bcrypt.hashSync(newUserData.password, 10);
        return newUserData;
      },
      beforeBulkCreate: async (newUserData) => {
        const hashedPasswords = newUserData.map((newUser) => {
          newUser.password = bcrypt.hashSync(newUser.password, 10);
          return newUser;
        });
        return hashedPasswords;
      },
      beforeUpdate: async (newUserData) => {
        newUserData.password = bcrypt.hashSync(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;