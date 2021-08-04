const router = require("express").Router();
const sequelize = require("../config/connection");
const db = require("../models");

router.get("/", (req, res) => {
  db.Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: { model: db.User, attributes: ["username"] },
      },
      {
        model: db.User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) =>
        post.get({
          plain: true,
        })
      );

      res.render("home", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
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

      res.render("viewPost", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/register", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("register");
});

// router.get("*", (req, res) => {
//   res.status(404).render("404");
//   // res.redirect('/');
// });

//Export//
module.exports = router;