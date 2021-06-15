const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");

const postRouter = express.Router();

postRouter.get("/fetch-all", (req, res) => {
  Post.find({})
    .limit(5)
    .populate("userId")
    .exec((err, posts) => {
      if (err) {
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
      return res.status(200).json({ status: "success", posts });
    });
});

postRouter.get("/single/:id", (req, res) => {
  Post.findOne({ _id: id })
    .populate("userId")
    .exec((err, post) => {
      if (err) {
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
      return res.status(200).json({ status: "success", post });
    });
});

module.exports = postRouter;
