const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../../models");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get single user with posts and comments
router.get("/:id", async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Post,
          attributes: { excludes: [`createdAt`, `updatedAt`] },
        },
        {
          model: db.Comment,
          attributes: { exclude: [`createdAt`, `updatedAt`] },
        },
      ],
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// new user
router.post("/", async (req, res) => {
  try {
    const newUser = await db.User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// login
router.post("/login", (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username
    },
  }).then((user) => {
    if (!user) {
      res.status(403).json({
        message: "incorrect username or password",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (isPasswordCorrect) {
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          loggedIn: true,
        };
        res.json({ message: "You are logged in!" });
      } else {
        res.status(403).json({
          message: "incorrect username or password",
        });
      }
    }
  });
});

// logout
router.post("/logout", (req, res) => {
  if (req.session.user.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({ message: `Logged out!` }).end();
    });
  } else {
    res.status(404).end();
  }
});

// delete user
router.delete("/:id", (req, res) => {
  if (req.body.email === req.session.user.email) {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((user) => {
        res.json({ message: "User deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else {
    res.status(403).json({
      message: "incorrect username or password",
    });
  }
});

module.exports = router;