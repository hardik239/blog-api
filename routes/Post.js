const express = require("express");
const postRouter = express.Router();

const PostController = require("../controllers/PostController");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY
});

function fileFilter(req, file, cb) {
  const { mimetype } = file;
  const split = mimetype.split("/");
  const extension = split[1].toLowerCase();
  if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
    cb(null, false);
  } else {
    req.extension = extension;
    cb(null, true);
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = uuidv4() + "." + req.extension;
      cb(null, filename);
    }
  }),
  fileFilter: fileFilter
});

postRouter.post(
  "/uploadfiles",
  upload.single("image"),
  PostController().uploadFile
);

postRouter.post(
  "/create-post",
  upload.single("image"),
  PostController().createPost
);

postRouter.get("/fetch-all", PostController().fetchAllPost);

postRouter.post("/fetch-user-posts", PostController().fetchUserPosts);

postRouter.post("/update-post", PostController().updatePost);

postRouter.post("/delete-post", PostController().deletePost);

postRouter.post("/save-unsave-post", PostController().saveUnsavePost);

postRouter.post("/fetch-user-saved-posts", PostController().fetchSavedPost);

postRouter.post("/post-comment", PostController().PostComment);

postRouter.post("/fetch-comment", PostController().FetchPostComment);

module.exports = postRouter;
