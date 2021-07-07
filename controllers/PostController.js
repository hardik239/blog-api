const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");

const User = require("../models/User");
const Post = require("../models/Post");
const Comments = require("../models/Comments");

const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const formidable = require("formidable");
const uniqueSlug = require("unique-slug");

module.exports = () => {
  return {
    createPost: async (req, res) => {
      const form = formidable({ multiples: true });

      form.parse(req, async (error, fields, files) => {
        let { title, body, token, categories } = fields;

        try {
          const response = jwt.verify(token, process.env.JWT_SECRET);

          const user = await User.findOne({ _id: response.sub });

          if (user) {
            categories = JSON.parse(categories);

            if (Object.keys(files).length === 0) {
              return res
                .status(400)
                .json({ msg: "Cover Image is required", status: "warning" });
            } else {
              const { type } = files.image;
              const split = type.split("/");
              const extension = split[1].toLowerCase();
              if (
                extension !== "jpg" &&
                extension !== "jpeg" &&
                extension !== "png"
              ) {
                res.status(400).json({
                  msg: `${extension} is not a valid extension`,
                  status: "warning"
                });
              } else {
                files.image.name = uuidv4() + "." + extension;

                const newPath =
                  __dirname + `/../client/public/images/${files.image.name}`;

                fs.copyFile(files.image.path, newPath, async (error) => {
                  if (!error) {
                    try {
                      let slug =
                        title.toLowerCase().split(" ").join("-") +
                        "-" +
                        uniqueSlug(`${user._id}${Date.now().toString()}`);

                      const response = await Post.create({
                        title,
                        body,
                        image: files.image.name,
                        userId: user._id,
                        categories,
                        slug
                      });
                      return res.status(200).json({
                        msg: "Your post Published successfully",
                        status: "success",
                        response
                      });
                    } catch (error) {
                      return res
                        .status(400)
                        .json({ status: "error", msg: error.message });
                    }
                  } else {
                    res
                      .status(400)
                      .json({ msg: "Something Went Wrong", status: "error" });
                  }
                });
              }
            }
          } else {
            res
              .status(400)
              .json({ msg: "Something Went Wrong", status: "error" });
          }
        } catch (error) {
          return res.status(400).json({
            msg: error.message,
            status: "warning"
          });
        }
      });
    },
    uploadFile: (req, res) => {
      const form = formidable({ multiples: true });

      form.parse(req, (error, fields, files) => {
        if (Object.keys(files).length === 0) {
          return res.json({ success: false, msg: "Image is required" });
        } else {
          const { type } = files.file;
          const split = type.split("/");
          const extension = split[1].toLowerCase();
          if (
            extension !== "jpg" &&
            extension !== "jpeg" &&
            extension !== "png"
          ) {
            return res.json({
              success: false,
              msg: `${extension} is not a valid extension`
            });
          } else {
            files.file.name = uuidv4() + "." + extension;
            const newPath =
              __dirname + `/../client/public/images/${files.file.name}`;
            fs.copyFile(files.file.path, newPath, async (error) => {
              if (!error) {
                return res.status(200).json({
                  success: true,
                  url: files.file.name
                });
              } else {
                return res.json({ success: false, err });
              }
            });
          }
        }
      });
    },
    fetchAllPost: (req, res) => {
      Post.find({})
        .populate("userId")
        .exec((err, posts) => {
          if (err) {
            return res
              .status(400)
              .json({ msg: "Something Went Wrong", status: "warning" });
          }
          return res.status(200).json({ status: "success", posts });
        });
    },
    fetchUserPosts: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          Post.find({ userId: response.sub })
            .populate("userId")
            .exec((err, myPosts) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .json({ msg: "Something Went Wrong", status: "warning" });
              }
              return res.status(200).json({ status: "success", myPosts });
            });
        } else {
          return res
            .status(400)
            .json({ msg: "Something Went Wrong", status: "warning" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
    },
    fetchSavedPost: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          User.findById(user._id)
            .limit()
            .populate({
              path: "savedPosts",
              populate: { path: "userId" }
            })
            .exec((err, posts) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .json({ msg: "Something Went Wrong", status: "warning" });
              }

              return res.status(200).json({ status: "success", posts });
            });
        }
      } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
      }
    },
    updatePost: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          const form = formidable({ multiples: true });

          form.parse(req, async (error, fields, files) => {
            let { id, title, body, categories, prevImageName } = fields;

            categories = JSON.parse(categories);

            if (files.image && files.image.size > 0) {
              const { type } = files.image;
              const split = type.split("/");
              const extension = split[1].toLowerCase();
              if (
                extension !== "jpg" &&
                extension !== "jpeg" &&
                extension !== "png"
              ) {
                return res.status(400).json({
                  msg: `${extension} is not a valid extension`,
                  status: "warning"
                });
              } else {
                files.image.name = uuidv4() + "." + extension;

                const newPath =
                  __dirname + `/../client/public/images/${files.image.name}`;

                fs.copyFile(files.image.path, newPath, async (error) => {
                  if (!error) {
                    try {
                      let slug =
                        title.toLowerCase().split(" ").join("-") +
                        "-" +
                        uniqueSlug(`${user._id}${Date.now().toString()}`);

                      const response = await Post.findByIdAndUpdate(id, {
                        title,
                        body,
                        image: files.image.name,
                        userId: user._id,
                        categories,
                        slug
                      });

                      fs.unlink(
                        `${__dirname}/../client/public/images/${prevImageName}`,
                        (err) => {
                          if (!err) {
                            console.log(
                              `${prevImageName} Deleted Successfully`
                            );
                          }
                        }
                      );

                      return res.status(200).json({
                        msg: "Your post updated successfully",
                        status: "success",
                        response
                      });
                    } catch (error) {
                      res
                        .status(400)
                        .json({ msg: "Something Went Wrong", status: "error" });
                    }
                  } else {
                    res
                      .status(400)
                      .json({ msg: "Something Went Wrong", status: "error" });
                  }
                });
              }
            } else {
              try {
                let slug =
                  title.toLowerCase().split(" ").join("-") +
                  "-" +
                  uniqueSlug(`${user._id}${Date.now().toString()}`);
                const response = await Post.findByIdAndUpdate(id, {
                  title,
                  body,
                  categories,
                  slug
                });
                return res.status(200).json({
                  msg: "Your post updated successfully",
                  status: "success",
                  response
                });
              } catch (error) {
                return res
                  .status(500)
                  .json({ status: "error", msg: error.message });
              }
            }
          });
        } else {
          return res
            .status(400)
            .json({ msg: "Something Went Wrong", status: "warning" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
    },
    saveUnsavePost: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          const { id } = req.body;
          const flag = user.savedPosts.includes(id);

          if (flag) {
            await User.updateOne(
              { _id: user._id },
              {
                $pull: {
                  savedPosts: id
                }
              }
            );
            return res.status(200).json({ msg: "post removed" });
          } else {
            await User.updateOne(
              { _id: user._id },
              {
                $addToSet: {
                  savedPosts: id
                }
              }
            );
            return res.status(200).json({ msg: "post saved" });
          }
        }
      } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
      }
    },
    deletePost: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          const { id } = req.body;

          try {
            const response = await Post.findByIdAndRemove(id);
            fs.unlink(
              `${__dirname}/../client/public/images/${response.image}`,
              (err) => {
                if (!err) {
                  console.log(`${response.image} Deleted Successfully`);
                }
              }
            );

            return res.status(200).json({ msg: "Your post has been deleted" });
          } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
          }
        }
      } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
      }
    },
    FetchPostComment: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          const { postId, comment } = req.body;
          const data = await Comments.create({
            comment,
            author: user.username
          });
          const temp = await Post.updateOne(
            { _id: postId },
            {
              $addToSet: {
                comments: data._id
              }
            }
          );
          if (temp.nModified) {
            return res
              .status(200)
              .json({ msg: "Comment Posted Successfully", status: "success" });
          } else {
            return res
              .status(400)
              .json({ msg: "Something Went Wrong", status: "warning" });
          }
        } else {
          return res
            .status(400)
            .json({ msg: "Something Went Wrong", status: "warning" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
    },
    PostComment: async (req, res) => {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const response = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: response.sub });

        if (user) {
          const { id } = req.body;
          Post.findById(id)
            .populate("comments")
            .exec((err, post) => {
              if (err) {
                console.log(err);
                return res
                  .status(400)
                  .json({ msg: "Something Went Wrong", status: "warning" });
              }
              return res
                .status(200)
                .json({ status: "success", comments: post.comments });
            });
        } else {
          return res
            .status(400)
            .json({ msg: "Something Went Wrong", status: "warning" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "Something Went Wrong", status: "warning" });
      }
    }
  };
};
