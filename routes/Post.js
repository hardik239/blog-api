const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const postRouter = express.Router();

const PostController = require("../controllers/PostController");

postRouter.post("/uploadfiles", PostController().uploadFile);

postRouter.post("/create-post", PostController().createPost);

postRouter.get("/fetch-all", PostController().fetchAllPost);

postRouter.post("/fetch-user-posts", PostController().fetchUserPosts);

postRouter.post("/update-post", PostController().updatePost);

postRouter.post("/delete-post", PostController().deletePost);

postRouter.post("/action-post", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const response = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: response.sub });

    if (user) {
      const { id } = req.body;

      return res.status(200).json({ msg: "post saved" });
    }
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
});

module.exports = postRouter;
