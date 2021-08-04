const { User } = require('../models');

const userData = [
  {
    username: "Connor",
    password: "password"
  },
  {
    username: "Joe",
    password: "password"
  },
  {
    username: "Louis",
    password: "password"
  },
  {
    username: "Bruce",
    password: "password"
  }
];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;