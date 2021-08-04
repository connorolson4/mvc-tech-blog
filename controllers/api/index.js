const express = require('express');
const router = express.Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/comments",commentRoutes);
router.use("/users",userRoutes);
router.use("/posts",postRoutes);

module.exports = router;