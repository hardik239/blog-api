const express = require("express");
const userRouter = express.Router();
const passport = require("passport");

const UserController = require("../controllers/UserController");

userRouter.post("/register", UserController().register);

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  UserController().login
);

userRouter.post("/userexist", UserController().userExist);

userRouter.post("/forgot-password", UserController().forgotPassword);

module.exports = userRouter;
