const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentsSchema);
