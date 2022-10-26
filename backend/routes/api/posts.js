const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Mailinglist = mongoose.model("Mailinglist");
const Post = mongoose.model("Post");
const validatePosts = require("../../validations/posts");

//posts index for when looking at posts history of mailing list
router.get("/", async (req, res, next) => {
  let posts;
  try {
  } catch (err) {}
});
