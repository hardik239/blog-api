const JWT = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "UltimateBlog",
      sub: userID
    },
    `${process.env.JWT_SECRET}`
  );
};

module.exports = () => {
  return {
    register: (req, res) => {
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
    },
    login: (req, res) => {
      if (req.isAuthenticated()) {
        const { _id, username, email, savedPosts } = req.user;
        const token = signToken(_id);
        res.status(200).json({
          isAuthenticated: true,
          user: { username, email, _id, savedPosts },
          token
        });
      }
    },
    userExist: async (req, res) => {
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
    },
    forgotPassword: async (req, res) => {
      try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const isUpdated = await User.updateOne(
          { email },
          { password: hashedPassword }
        );

        if (isUpdated.nModified) {
          return res
            .status(200)
            .json({ success: "Password Reset Successfully" });
        }
      } catch (error) {
        return res.status(200).json({ error: "Something Went Wrong..." });
      }
    }
  };
};
