const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const formidable = require("formidable");
const uniqueSlug = require("unique-slug");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "UltimateBlog",
      sub: userID
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "24h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { name: username, password, email } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({
        message: {
          msgBody: "Something Went Wrong..Error has occured...",
          msgError: true
        }
      });
    const newUser = new User({ username, password, email });
    newUser.save((err) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Something Went Wrong..Error has occured",
            msgError: true
          }
        });
      else
        res.status(201).json({
          message: {
            msgBody: "Account successfully created",
            msgError: false
          }
        });
    });
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, email } = req.user;
      const token = signToken(_id);
      // res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, email }, token });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: {}, success: true });
  }
);

userRouter.post(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user + "jj");
    const { username, email } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, email } });
  }
);

userRouter.post("/userexist", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.exists({ email });

    if (user) {
      return res.status(200).json({ info: "User Exits" });
    } else {
      return res.status(200).json({ success: "User Does not Exits" });
    }
  } catch (error) {
    return res.status(200).json({ error: "Something Went Wrong..." });
  }
});

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031

userRouter.post("/uploadfiles", (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (error, fields, files) => {
    if (Object.keys(files).length === 0) {
      return res.json({ success: false, msg: "Image is required" });
    } else {
      const { type } = files.file;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
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
});

userRouter.post("/create-post", async (req, res) => {
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

                  console.log(user._id, slug);

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
        res.status(400).json({ msg: "Something Went Wrong", status: "error" });
      }
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        status: "warning"
      });
    }
  });
});

module.exports = userRouter;
