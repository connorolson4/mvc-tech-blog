const express = require("express");
const router = express.Router();
const db = require("../../models");
const auth = require("../../utils/auth");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: {
        model: db.Comment,
        attributes: { exclude: [`createdAt`, `updatedAt`] },
      },
      attributes: { exclude: [`createdAt`, `updatedAt`] },
    });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// post post
router.post("/", async (req, res) => {
  try {
    const newPost = await db.Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    db.Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put(`/:id`,async (req,res)=>{
  try{
    db.Post.update(req.body, {
      where:{
        id: req.params.id
      }
    })
  }catch (err){
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;