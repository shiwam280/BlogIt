const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

//Create
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("post has been deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get Post Details
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get POSTS
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const allPosts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get User POSTS
router.get("/user/:userId", async (req, res) => {
  try {
    const allPosts = await Post.find({ userId: req.params.userId });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
