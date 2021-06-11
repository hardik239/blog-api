const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "UltimateBlog",
      sub: userID
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: "1h" }
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

module.exports = userRouter;
