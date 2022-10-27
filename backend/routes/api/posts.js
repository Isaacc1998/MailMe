const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
// const User = mongoose.model("User");
// const Mailinglist = mongoose.model("Mailinglist");
// const validatePosts = require("../../validations/posts");

//posts index for when looking at posts history of mailing list
router.get("/", async (req, res, next) => {
  let posts;
  console.log("hit posts backend");

  try {
    posts = await Post.find()
      .populate("list", "_id owner name")
      .sort({ createdAt: -1 });

    return res.json(posts);
  } catch (err) {
    console.log("catch error boi!!");
    return res.json([]);
  }
});

module.exports = router;
