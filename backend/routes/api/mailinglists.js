const passport = require("passport");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { requireUser } = require("../../config/passport");
const Mailinglist = mongoose.model("Mailinglist");
const Post = mongoose.model("Post");
const validateMailinglist = require("../../validations/mailinglists");
const validatePosts = require("../../validations/posts");
// const { isProduction } = require("../../config/keys");

//mailing list index for current user
router.get("/home", requireUser, async (req, res, next) => {
  let currentUser;
  try {
    currentUser = await User.findById(req.user._id);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user has that id" };
    return next(error);
  }

  try {
    let mailinglists = await Mailinglist.find({ owner: currentUser._id })
      .sort({ createdAt: -1 })
      .populate("owner", "_id, username");
    // .limit(10); // don't put a limit
    return res.json(mailinglists);
  } catch (err) {
    return res.json([]);
  }
});

// get a mailing list
router.get("/:mailinglistId", async (req, res, next) => {
  let list;
  try {
    list = await Mailinglist.findById(req.params.mailinglistId);
    return res.json(list);
  } catch (err) {
    const error = new Error("Mailing List not found");
    error.statusCode = 404;
    error.errors = { message: "No mailing list found with that id" };
    return next(error);
  }
});

//create a new mailing list
router.post("/", requireUser, validateMailinglist, async (req, res, next) => {
  try {
    const newList = new Mailinglist({
      name: req.body.name,
      owner: req.user._id,
      emails: req.body.emails,
    });

    let list = await newList.save();
    list = await list.populate("owner", "_id, username");
    return res.json(list);
  } catch (err) {
    next(err);
  }
});

//update a mailing list
router.put("/:mailinglistId", requireUser, async (req, res, next) => {
  let list;
  try {
    list = await Mailinglist.findById(req.params.mailinglistId);
    // list = await Mailinglist.find({ _id: req.params.mailinglistId });

    list["name"] = req.body.name;
    for (let i = 0; i < req.body.emails.length; i++) {
      list["emails"].push(req.body.emails[i]);
    }
    list.update();
    await list.save();
    return res.json(list);
  } catch (err) {
    const error = new Error("Mailing List not found");
    error.statusCode = 404;
    error.errors = { message: "No mailing list found with that id" };
    return next(error);
  }
});

//delete mailing list
router.delete("/:mailinglistId", async (req, res, next) => {
  let list;
  try {
    list = await Mailinglist.findById(req.params.mailinglistId);
    list.remove();
    return res.json(list);
  } catch {
    const error = new Error("Mailing List not found");
    error.statusCode = 404;
    error.errors = { message: "No mailing list found with that id" };
    return next(error);
  }
});

//////// posts routers //////

//posts index for when looking at posts history of mailing list
router.get("/:mailinglistId/posts", async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find({ list: req.params.mailinglistId })
      .populate(
        "list",
        "_id, name"
        //if needed, add emails as well later ^
      )
      .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (err) {
    return res.json([]);
  }
});

//get single post by id
router.get("/:mailinglistId/posts/:postId", async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);
    return res.json(post);
  } catch (err) {
    const error = new Error("Email message not found");
    error.statusCode = 404;
    error.errors = { message: "Email message with that id not found" };
    return next(error);
  }
});

//create new post
router.post("/:mailinglistId/posts", validatePosts, async (req, res, next) => {
  let newPost;
  try {
    newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      list: req.params.mailinglistId,
    });
    let post = await newPost.save();
    post.populate("list", "_id, name");
    //add emails too if needed ^^
    return res.json(post);
  } catch (err) {
    next(err);
  }
});

router.put("/:mailinglistId/posts/:postId", async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);

    post.title = req.body.title;
    post.content = req.body.content;
    post.update();
    await post.save();
    return res.json(post);
  } catch (err) {
    const error = new Error("Email message not found");
    error.statusCode = 404;
    error.errors = { message: "Email message with that id not found" };
    return next(error);
  }
});

router.delete("/:mailinglistId/posts/:postId", async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.postId);
    post.remove();
    return res.json(post);
  } catch (err) {
    const error = new Error("Email message not found");
    error.statusCode = 404;
    error.errors = { message: "Email message with that id not found" };
    return next(error);
  }
});
module.exports = router;
