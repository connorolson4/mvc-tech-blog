const router = require("express").Router();
const sequelize = require("../config/connection");
const db = require("../models");
const auth = require("../utils/auth");

router.get("/", auth, (req, res) => {
  db.Post.findAll({
    where: {
      user_id: req.session.user.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: db.User,
          attributes: ["username"],
        },
      },
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) =>
        post.toJSON()
      );
      res.render("dash", {
        posts,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", auth, (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: db.User,
          attributes: ["username"],
        },
      },
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }

      const post = dbPostData.get({
        plain: true,
      });

      res.render("editPost", {
        post,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/new", auth, (req, res) => {
  res.render("addPost", {
    loggedIn: true,
  });
});

module.exports = router;