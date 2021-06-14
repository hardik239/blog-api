const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments"
    },
    categories: {
      type: [],
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
