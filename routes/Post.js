const express = require("express");
const postRouter = express.Router();

const PostController = require("../controllers/PostController");

postRouter.post("/uploadfiles", PostController().uploadFile);

postRouter.post("/create-post", PostController().createPost);

postRouter.get("/fetch-all", PostController().fetchAllPost);

postRouter.post("/fetch-user-posts", PostController().fetchUserPosts);

postRouter.post("/update-post", PostController().updatePost);

postRouter.post("/delete-post", PostController().deletePost);

postRouter.post("/save-unsave-post", PostController().saveUnsavePost);

postRouter.post("/fetch-user-saved-posts", PostController().fetchSavedPost);

postRouter.post("/post-comment", PostController().FetchPostComment);

postRouter.post("/fetch-comment", PostController().PostComment);

module.exports = postRouter;
